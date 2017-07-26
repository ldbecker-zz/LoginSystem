const React = require('react');
const axios = require('axios');

class Admin extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      users: [],
      username: props.user
    };

    this.getUsers = this.getUsers.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.getUsers();
  }

  getUsers() {
    var context = this;
    axios.get('/getUsers').then(function(resp) {
      context.setState({
        users: resp.data.filter(function(elem) {
          return elem.username !== context.state.username;
        })
      });
    });
  }

  deleteUser(e) {
    e.preventDefault();
    var context = this;
    var id = parseInt(e.target.id);
    axios.post('/deleteUser', {
      id: id
    }).then(function(resp) {
      context.getUsers();
    })
  }


  render() {
    var context = this;
    return (
        <div>
          This is your Admin Panel. You can manage users below:<br/><br/>
          {this.state.users.map(function(user) {
            return (
                <div>
                  Username: {user.username}<br/>
                  Account Type: {user.accountType}<br/>
                  {user.accountType === 'ADMIN' ?
                    <div>
                      Demote user (ran out of time)
                    </div>
                  :
                    <div>
                      Promote user (ran out of time)
                    </div>
                  }
                  <div onClick={context.deleteUser} id={user.id}>Delete user</div><br/><br/>
                </div>
              );
          })}
        </div>
      );
  }
}

module.exports = Admin;