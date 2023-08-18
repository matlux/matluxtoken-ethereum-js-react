const path = require('path');
const fs = require('fs')
const solc = require('solc')

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'Lottery.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const strInput = JSON.stringify(input);
const compiledContractStr = solc.compile(strInput);
const compiledContractObject = JSON.parse(compiledContractStr);

console.log('compiledContract:',compiledContractStr);
//console.log(
// module.exports = solc.compile(source,1).contracts[':Inbox'];
console.log('contracts:',compiledContractObject.contracts);

module.exports = compiledContractObject.contracts[
  'Lottery.sol'
].Lottery;