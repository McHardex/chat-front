import React, { Component } from "react";
import io from "socket.io-client";

const socket = io.connect("https://chaty-back.herokuapp.com/"); 


class ChatInterface extends Component {
    constructor(props) {
        super(props);
        const { username } = this.props;
        this.state = {
          username,
          message: '',
          chatHistory: [],
          userTyping: '',
          isTyping: false,
        };
      };
    
      componentDidMount() {
        this.checkUserName();
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
      
      checkUserName = () => {
          const { username } = this.state;
          if (!username) {
            this.props.history.push('/')
          } 
      }
    
    
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
                name="username"
                defaultValue={username}
                readOnly
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


export default ChatInterface;
