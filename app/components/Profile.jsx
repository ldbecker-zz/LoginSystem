const React = require('react');
const axios = require('axios');
const Admin = require('./Admin.jsx');

class Profile extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      admin: false,
    };
    this.getUser = this.getUser.bind(this);
    this.getUser();
  }

  getUser() {
    var id = document.getElementsByTagName('h1')[0].innerHTML;
    id = id.split(': ')[1];
    var context = this;
    axios.get('/getUser/' + id).then(function(resp) {
      console.log(resp.data);
      context.setState({
        user: resp.data,
        admin: (resp.data.accountType === 'ADMIN')
      });
    });
  }

  render() {
    return (
        <div>
          {this.state.user ? 'Welcome, ' + this.state.user.username : 'Welcome'}<br/>
          {this.state.admin ? <Admin user={this.state.user.username}/> : 
            <div>
              If you were an admin, you would see your admin panel here!
            </div>
          }
          <a href="/logout">Log Out</a>
        </div>
      );
  }
}

module.exports = Profile;