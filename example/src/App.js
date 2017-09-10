import React, { Component } from 'react';
import Slider from 'react-precision-slider';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>react-precision-slider</h2>
        </div>
        <div className="App-content">
          <Slider
            label="Scale"
            min={0}
            max={10}
            step={0.01}
            defaultValue={1.0}
            onChange={() => {}}
          />
        </div>
      </div>
    );
  }
}

export default App;
