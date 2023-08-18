import logo from './logo.svg';
import './App.css';
import ff from './web3'
import lottery from './lottery';
import { Component } from 'react';

const {web3 , accounts} = ff;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { manager: '[not initialised]'};
  }

  async componentDidMount() {
    const fromAccounts = await accounts
    // const lottery2 = await init_lottery();
    console.log('lottery=',lottery);
    const manager = await lottery.methods.manager().call({from : fromAccounts[0]});
    console.log('lottery.methods.manager()=',lottery.methods.manager());
    console.log('manager=',manager);
    console.log('accounts2=',fromAccounts[0]);
    this.setState({manager});
  }

  
  render() {
    return (
      <div >
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
      </div>
    );
  }
  
  }

export default App;
