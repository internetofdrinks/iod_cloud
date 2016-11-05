import React from 'react';
import _ from 'lodash';

import UserStore from '../stores/_UserStore';
import Events from '../util/_EventEmitter';

export default class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: UserStore.getUsers()
    };
  }

  componentDidMount() {
    Events.addListener(UserStore.CHANGE_EVENT, this.updateState);
  }

  componentWillUnmount() {
    Events.removeListener(UserStore.CHANGE_EVENT, this.updateState);
  }

  updateState() {
    this.setState({
      users: UserStore.getUsers()
    });
  }

  render() {
    return (
      <div>
        <h1>All Users</h1>
        <ul>
          {_.map(this.state.users, user =>
            <li>{user.name}</li>
          )}
        </ul>
      </div>
    );
  }
}