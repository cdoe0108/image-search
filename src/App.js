import React, { Component } from 'react';
import './App.css';

import SearchComp from './searchComp';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <header className="App-header">
          <h1 className="App-title">Welcome to Flicker</h1>
        </header>
        <div className="wrapper">
          <SearchComp/>
        </div>
      </div>
    );
  }
}

export default App;
