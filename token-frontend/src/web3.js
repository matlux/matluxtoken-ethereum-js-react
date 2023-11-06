import Web3 from "web3";


const init_eth = async () => {
  const ethereum = window.ethereum;
  const accounts = await ethereum.request({ method: 'eth_accounts' });
  console.log('accounts=', accounts);
  // const instance = await ethereum.request({method: 'eth_requestAccounts', params: [accounts[0]] }, window.abi, 0x51d9aD5C5EB7FDBB444D78ADE2a194f87dcEf735);

  //   console.log('instance=',instance);

    // instance.methods
    return await accounts;
}

const accounts = init_eth();
const web3 = new Web3(window.ethereum)

export default {web3: web3,accounts: accounts};