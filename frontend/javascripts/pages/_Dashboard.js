import React from 'react';
import UserList from '../components/_UserList';
import Leaderboard from '../components/_Leaderboard';
import History from '../components/_History';

import UserStore from '../stores/_UserStore';
import { Link } from 'react-router';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    UserStore.fetchUsers();
    UserStore.fetchLeaders();
  }

  render() {
    return (
      <div className="mdl-cell mdl-cell--12-col shadow-container">
        <Leaderboard />
        <History />
        <UserList />
        <div className="actions">
          <Link to="/frontend/users/new"
                className="mdl-button mdl-button--raised mdl-button--accent mdl-js-button mdl-js-ripple-effect">
            New User
          </Link>
        </div>
      </div>
    );
  }
}
