const React = require('react');
class Register extends React.Component {
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
          <a href="/">Back to Login</a>     
        </div>
      );
  }
}

module.exports = Register;