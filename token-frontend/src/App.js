import logo from './logo.svg';
import './App.css';
import w3map from './web3'
import lottery from './lottery';
import { Component } from 'react';

const {web3 , accounts} = w3map;

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { manager: '[not initialised]'};
  // }
  state = {
    manager : '',
    players : [],
    balance : '',
    message: '',
    value : ''
  }

  async componentDidMount() {
    // const fromAccounts = await accounts
    // const lottery2 = await init_lottery();
    console.log('lottery=',lottery);
    // console.foobaf();
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const contractAddress = lottery.options.address;
    const balance = await web3.eth.getBalance(contractAddress);
    console.log('lottery.methods.manager()=',lottery.methods.manager());
    console.log('manager=',manager);
    // console.log('accounts2=',fromAccounts[0]);
    this.setState({manager, players, balance});
  }

  onSubmit = async (event) => {
    event.preventDefault();
    console.log('onSubmit lottery=',lottery);

    const accounts = await web3.eth.getAccounts();
    const newValue = web3.utils.toWei(this.state.value, 'ether');


    this.setState({message: 'waiting on transaction success...'});

    await lottery.methods.enter().send({from: accounts[0],
      value: newValue});

      this.setState({message: 'You have been entered'});

  }

  onClick = async (event) => {
    const accounts = await web3.eth.getAccounts();
    this.setState({message: 'waiting on transaction success...'});

    await lottery.methods.pickWinner().send({from: accounts[0]});

    this.setState({message: 'Winner has been picked'});
  }

  
  render() {
    return (
      <div >
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}.
        </p><p>
        There are currently {this.state.players.length} players in the lottery.
        </p><p>
        The balance is {web3.utils.fromWei(this.state.balance,'ether')} ether.
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({value : event.target.value})} 
            />
            <button>Enter</button>

          </div>
        </form>
        <hr />
        <button onClick={this.onClick}>pick a winner</button>
        <hr />
        <p>{this.state.message}

      </p>
      </div>
    );
  }
  
  }

export default App;
