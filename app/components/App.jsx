const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');
import { Router, Route, browserHistory } from 'react-router';

class App extends React.Component {
	constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          Hello!!      
        </div>
      );
  }
}

ReactDOM.render(<Router history={browserHistory}>
    <Route path="/" component={App}></Route>
  </Router>, document.getElementById('app'));