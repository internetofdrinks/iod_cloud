import React from 'react';
import {Router, Route, browserHistory} from 'react-router';

import Layout from './_Layout';
import Header from './_Header';

import Dashboard from '../pages/_Dashboard';
import NewUser from '../pages/_NewUser';
import EditUser from '../pages/_EditUser';
import ShowUser from '../pages/_ShowUser';
import UserIndex from '../pages/_UserIndex';

import SlideIntro from '../pages/_SlideIntro';
import SlideMartin from '../pages/_SlideMartin';
import SlideSascha from '../pages/_SlideSascha';
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
          <Route path="/frontend/slides" components={{ content: SlideIntro, header: Header, wide: "true", fullHeight: "true" }} />
          <Route path="/frontend/slides/overview" components={{ content: SlideOverview, header: Header, wide: "true", fullHeight: "true" }} />
          <Route path="/frontend/slides/martin" components={{ content: SlideMartin, header: Header }} />
          <Route path="/frontend/slides/sascha" components={{ content: SlideSascha, header: Header }} />
        </Route>
      </Router>
    );
  }
}
