import React from 'react';
import UserList from '../components/_UserList';
import { Link } from 'react-router';

export default class Dashboard extends React.Component {
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
