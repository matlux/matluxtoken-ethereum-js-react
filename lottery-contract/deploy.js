const HDWalletProvider = require('@truffle/hdwallet-provider');

const { Web3 } = require('web3');


const {abi, evm} = require('./compile');


const provider = new HDWalletProvider(
  'arrow fatigue jaguar wild ask project erosion thunder chaos wealth section beach',
  'https://sepolia.infura.io/v3/5029d5f54bf64a69b1cc15e9dc287a39');
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('attempting deploy from account', accounts[0]);

  // const result = await new web3.eth.Contract(abi)
  //   .deploy({data: evm.bytecode.object, arguments: []})
  //   .send({from: accounts[0], gas: '1000000'});

  //console.log('contact deployed to', result.options.address);  
  console.log('interface', abi);  
};

deploy();