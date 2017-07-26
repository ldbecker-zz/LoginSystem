const React = require('react');
class Register extends React.Component {
	constructor(props) {
    super(props);

    this.state = {

    };

    this.regSubmit = this.regSubmit.bind(this);
  }

  regSubmit(e) {
    if(document.getElementById('regUser').value === '' || document.getElementById('regPass').value === '') {
      alert('Please enter a username and password');
      e.preventDefault();
      return false;
    }
  }

  render() {
    return (
        <div>
          <form onSubmit={this.regSubmit} action="/register" method="post">
            <input id="regUser" type="text" name="username"></input>
            <input id="regPass" type="text" name="password"></input><br/>
            Are you an admin? (Be honest!)<select name="type">
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
            <button type="submit">Submit</button>
          </form><br/><br/> 
          <a href="/">Back to Login</a>     
        </div>
      );
  }
}

module.exports = Register;