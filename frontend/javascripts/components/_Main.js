import React from 'react';
import {Router, Route, browserHistory} from 'react-router';

import Layout from './_Layout';
import Header from './_Header';

import Dashboard from '../pages/_Dashboard';
import NewUser from '../pages/_NewUser';
import EditUser from '../pages/_EditUser';
import ShowUser from '../pages/_ShowUser';
import UserIndex from '../pages/_UserIndex';

import SlideOverview from '../pages/_SlideOverview';

export default class Main extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route component={Layout}>
          <Route path="/" components={{ content: Dashboard, header: Header }} />
          <Route path="/frontend/users" components={{ content: UserIndex, header: Header }} />
          <Route path="/frontend/users/new" components={{ content: NewUser, header: Header }} />
          <Route path="/frontend/users/:id" components={{ content: ShowUser, header: Header }} />
          <Route path="/frontend/users/:id/edit" components={{ content: EditUser, header: Header }} />
          <Route path="/frontend/slides" components={{ content: SlideOverview, header: Header, wide: "true", fullHeight: "true" }} />
        </Route>
      </Router>
    );
  }
}
