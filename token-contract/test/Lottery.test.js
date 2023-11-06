const ganache = require('ganache');
const { Web3 } = require('web3');
const assert = require('assert')

const web3 = new Web3(ganache.provider())
const {abi, evm} = require('../compile')

let account;
let inbox;

beforeEach(async () =>{
  account = await web3.eth.getAccounts();

  lottery = await new web3.eth.Contract(abi)
    .deploy({data: evm.bytecode.object, arguments: []})
    .send({from: account[0], gas: '1000000'});

});

describe('Lottery', () => {
  it('deploys a contract', () => {
    // console.log(inbox)
    // console.log(inbox.options.address)
    // console.log(42)
    assert.ok(lottery.options.address);
  });
  it('has Manager', async () => {
    const managerAccount = await lottery.methods.manager().call();
    assert.equal(managerAccount,account[0]);
  });

  it('allows one account to enter', async () => {
    const hash = await lottery.methods.enter()
      .send({from: account[0], 
             value: web3.utils.toWei('0.02','ether')
            });
    
    const players = await lottery.methods.getPlayers().call({from: account[0]});
    assert.equal(account[0],players[0]);
    assert.equal(1,players.length);    
  });

  it('allows multiple accounts to enter', async () => {
    await lottery.methods.enter()
      .send({from: account[0], 
             value: web3.utils.toWei('0.02','ether')
            });

    await lottery.methods.enter()
      .send({from: account[1], 
            value: web3.utils.toWei('0.03','ether')
          });

    await lottery.methods.enter()
      .send({from: account[2], 
            value: web3.utils.toWei('0.03','ether')
          });
    
    const players = await lottery.methods.getPlayers().call({from: account[0]});
    assert.equal(account[0],players[0]);
    assert.equal(account[1],players[1]);
    assert.equal(account[2],players[2]);
    assert.equal(3,players.length);    

    const value = await web3.eth.getBalance(lottery._address);
    // const value = await lottery.methods.value().call({from: account[0]});
    assert.equal(web3.utils.toWei('0.08','ether'),value);
  });

  it('requires a minimum amount to enter', async () => {
    try {
      await lottery.methods.enter()
      .send({from: account[0], 
          value: web3.utils.toWei('0.009','ether')
        });
      assert(false);
    } catch (err) {
      assert(err);
    }

  });

  it('only manager can pickWinner()', async () => {
    try {
      await lottery.methods.pickWinner()
      .send({from: account[1]
        });
      assert(false);
    } catch (err) {
      assert(err);
    }

  });

  it('sends money to the Winner and reset the player array', async () => {
    await lottery.methods.enter()
    .send({from: account[1], 
          value: web3.utils.toWei('2','ether')
        });

    const initBalance = await web3.eth.getBalance(account[1]);    

    await lottery.methods.pickWinner()
      .send({from: account[0]
        });
    const newBalance = await web3.eth.getBalance(account[1]);  

    const difference = newBalance - initBalance;

    assert(difference > web3.utils.toWei('1.8','ether'));

    const players = await lottery.methods.getPlayers().call({from: account[0]});
    assert.equal(0,players.length);  
    
    const value = await web3.eth.getBalance(lottery._address);
    assert.equal(web3.utils.toWei('0','ether'),value);

  });

});