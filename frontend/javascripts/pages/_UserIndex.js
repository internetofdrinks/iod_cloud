import React from 'react';
import UserStore from '../stores/_UserStore';
import UserList from '../components/_UserList';

import { Link } from 'react-router';

export default class UserIndex extends React.Component {
  constructor(props) {
    super(props);

    UserStore.fetchUsers();
  }

  render() {
    return (
      <div className="mdl-cell mdl-cell--12-col shadow-container">
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
