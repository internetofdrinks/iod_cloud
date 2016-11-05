import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';

import UserStore from '../stores/_UserStore';
import Events from '../util/_EventEmitter';

export default class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: UserStore.getUsers()
    };

    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    Events.addListener(UserStore.CHANGE_EVENT, this.updateState);

    componentHandler.upgradeDom();
  }

  componentDidUpdate() {
    componentHandler.upgradeDom();
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
        <ul className="list--unstyled list-table">
          {_.map(this.state.users, user =>
            <li key={user.userid}>
              <Link to={"/frontend/users/" + user.userid + "/edit"}
                    className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fake">
                <div>{user.firstname} {user.lastname}</div>
                <div>{user.email}</div>
                <div>{user.userid}</div>
              </Link>
            </li>
          )}
        </ul>
      </div>
    );
  }
}