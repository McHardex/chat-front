import React, { Component } from 'react';
import socketIOClient from "socket.io-client";

import './App.css';


class App extends Component {

  componentDidMount() {
    socketIOClient('http://localhost:5000');
  }

  render() {
    return (
        <div id="wrap">
          <div className="chat-wrap">
            <div id="output"></div>
          </div>
          <div id="feedback"></div>
          <form id="form">
            <input id="handle" type="text" autocomplete="off" placeholder="Enter your nickname" required/>
            <input id="message" type="text" placeholder="Enter message " autocomplete="off" required/>
            <button type="submit">Send</button>
          </form>
        </div>
    );
  }
}

export default App;
