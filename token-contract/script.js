const ganache = require('ganache');
const { Web3 } = require('web3');
const assert = require('assert')

const web3 = new Web3(ganache.provider())
const {interface, bytecode} = require('./compile')

console.log(1 + 5)


account = await web3.eth.getAccounts();

  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Hi There']})
    .send({from: account[0], gas: '1000000'})



    console.log(inbox)