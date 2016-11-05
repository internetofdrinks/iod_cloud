import React from 'react';
import {Router, Route, browserHistory} from 'react-router';

import Layout from './_Layout';
import Header from './_Header';

import Dashboard from '../pages/_Dashboard';
import NewUser from '../pages/_NewUser';

export default class Main extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route component={Layout}>
          <Route path="/" components={{ content: Dashboard, header: Header }} />
          <Route path="/frontend/users/new" components={{ content: NewUser, header: Header }} />
        </Route>
      </Router>
    );
  }
}
