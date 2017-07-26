const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');
const Register = require('./Register.jsx');
const Profile = require('./Profile.jsx');

import { Router, Route, browserHistory } from 'react-router';

class App extends React.Component {
	constructor(props) {
    super(props);

    this.state = {

    };

    this.loginSubmit = this.loginSubmit.bind(this);
  }

  loginSubmit(e) {
    if(document.getElementById('loginUser').value === '' || document.getElementById('loginPass').value === '') {
      alert('Please enter a username and password');
      e.preventDefault();
      return false;
    }
  }

  render() {
    return (
        <div>
          <form onSubmit={this.loginSubmit} action="/login" method="post">
            <input id="loginUser" type="text" name="username"></input>
            <input id="loginPass" type="text" name="password"></input><br/>
            <button type="submit">Submit</button>
          </form><br/><br/> 
          <a href="/register">Need to Register? Click here!</a>     
        </div>
      );
  }
}

ReactDOM.render(<Router history={browserHistory}>
    <Route path="/" component={App}></Route>
    <Route path='/register' component={Register}></Route>
    <Route path='/profile' component={Profile}></Route>
  </Router>, document.getElementById('app'));