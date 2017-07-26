const React = require('react');

class Profile extends React.Component {
	constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
        <div>
          Profile!<br/>
          <a href="/logout">Log Out</a>
        </div>
      );
  }
}

module.exports = Profile;