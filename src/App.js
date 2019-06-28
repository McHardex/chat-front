import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ChatInterface from './components/ChatInterface';
import NotFoundPage from './components/NotFoundPage';
import HomePage from './components/Homepage';
import "./App.css";


class App extends Component {
  state = {
    username: '',
    path: '',
  }
  handleUserName = ({ target }) => {
    this.setState({username: target.value })
  }

  handlePath = (path) => {
    this.setState({ path })
  }

  render() {
    return (
      <Router>
        <Switch>
        <Route  
          path="/chat/:chatId"  
          exact render={(props) => <ChatInterface 
          {...props} 
          username={this.state.username}
          path={this.state.path} />} 
        />
        <Route  
          path="/" 
          exact 
          render={(props) => <HomePage 
          {...props} 
          handleUserName={this.handleUserName} 
          handlePath={this.handlePath} />} 
        />
        <Route  path="*" component={NotFoundPage}  />
        </Switch>
      </Router>
    );
  }
}

export default App;
