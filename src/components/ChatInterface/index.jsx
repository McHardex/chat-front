import React, { Component } from "react";
import io from "socket.io-client";


class ChatInterface extends Component {
    constructor(props) {
        super(props);
        this.state = {
          message: '',
          chatHistory: [],
          userTyping: '',
          isTyping: false,
          socket: io(`https://chaty-back.herokuapp.com/`),
        };
      };
    
      componentDidMount() {
        const { socket } = this.state;
        const { username } = this.props;
        const pathName = this.props.history.location.pathname
        socket.emit('join', { username, pathName })
        socket.on('join', resp => {
          this.setState({ chatHistory: this.state.chatHistory.concat({join: `${resp.username} has just joined`}) })
        });

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
        const { socket } = this.state;
        const { username } = this.props;
        socket.emit('typing', username);
        socket.on('typing', data => this.setState({ isTyping: true, userTyping: data }));
      }
    
      submitForm = e => {
        e.preventDefault();
        const { message, socket } = this.state;
        const { username } = this.props;
        const data = { username, message };
        socket.emit('chat', data);
        this.setState({ message:  ''})
      }
    
    
      renderChat = (chat, chatHistory) => (
        <div id="output" key={chatHistory.length += 1}>
         {chat.join ? chat.join : <p><strong>{`${chat.username}:`}</strong> {chat.message} </p> }
        </div>
      )
    
    
      render() {
        const { message, isTyping, chatHistory, userTyping } = this.state;
        const { username } = this.props;
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
