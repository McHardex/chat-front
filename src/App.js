import React, { Component } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io.connect("https://chaty-back.herokuapp.com/"); 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      message: '',
      chatHistory: [],
      userTyping: '',
      isTyping: false,
    };
  };

  componentDidMount() {
    socket.on('chat', resp => {
      this.setState({
        chatHistory: this.state.chatHistory.concat([resp]),
        isTyping: false,
      });
    });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleTyping = () => {
    const { username } = this.state;
    socket.emit('typing', username);
    socket.on('typing', data => this.setState({ isTyping: true, userTyping: data }));
  }

  submitForm = e => {
    e.preventDefault();
    const { username, message } = this.state;
    const data = { username, message };
    socket.emit('chat', data);
    this.setState({ message:  ''})
  }


  renderChat = (chat, chatHistory) => (
    <div id="output" key={chatHistory.length += 1}>
      <p><strong>{`${chat.username}:`}</strong> {chat.message} </p>
    </div>
  )


  render() {
    const { username, message, isTyping, chatHistory, userTyping } = this.state;
    return (
      <div id="wrap">
        <div className="chat-wrap">
          { chatHistory.map(chat => ( this.renderChat(chat, chatHistory))) }
        </div>
        <div id="feedback">{ isTyping? `${userTyping} is typing a message` : null }</div>
        <form id="form" onSubmit={this.submitForm}>
          <input
            type="text"
            name="username"
            value={username}
            autoComplete="off"
            placeholder="Enter your nickname"
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="message"
            value={message}
            placeholder="Enter message"
            autoComplete="off"
            onKeyDown={this.handleTyping}
            onChange={this.handleChange}
            required
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default App;
