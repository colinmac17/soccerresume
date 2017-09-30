import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      players: []
    }
  }

  componentDidMount() {
    axios.get('/api/players').then(response => {
        this.setState({
            players: response.data
        })
    })
}

  render() {
    const { players } = this.state;
    const allPlayers = players.map((player, index) => {
      return <li key={index}>{player.name}</li>
    });
    return (
      <div>
        <h1>SoccerResum.me</h1>
        <ul>{allPlayers}</ul>
      </div>
    )
  }
}

export default App;
