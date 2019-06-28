import React, { Component } from "react";
import randomstring from 'randomstring';

class Hompage extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.history.push(`/chat/${randomstring.generate(4)}`)
    }

    render() {
        const { handleUserName } = this.props;
        return(
            <div className="username-form-container">
                <form onSubmit={this.handleSubmit} className="username-form">
                    <h2 htmlFor="username" className="grid-center">Input a username</h2>
                    <input type="text" id="username" className="grid-center" name="username" onChange={handleUserName} required/>
                    <button className="grid-center chat-btn" type="submit">Start Chat</button>
                </form>
            </div>
        )
    }
}

export default Hompage;
