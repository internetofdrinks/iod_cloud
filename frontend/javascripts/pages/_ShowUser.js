import React from 'react';
import UserStore from '../stores/_UserStore';
import Events from '../util/_EventEmitter';
import _ from 'lodash';
import { browserHistory } from 'react-router';

import { Link } from 'react-router';
import { LineChart } from 'react-d3';

export default class ShowUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: UserStore.getUser(this.props.params.id)
    };

    this.updateState = this.updateState.bind(this);

    UserStore.fetchUser(this.props.params.id);
  }

  componentDidMount() {
    Events.addListener(UserStore.CHANGE_EVENT, this.updateState)
  }

  componentWillUnmount() {
    Events.removeListener(UserStore.CHANGE_EVENT, this.updateState)
  }

  updateState() {
    this.setState({
      user: UserStore.getUser(this.props.params.id)
    });
  }

  onDelete() {
    UserStore.deleteUser(this.state.user.userid,
      () => browserHistory.push("/"));
  }

  render() {
    var user = this.state.user;

    let series = [
      {
        name: `${user.firstname} ${user.lastname}`,
        strokeWidth: 3,
        values: _.filter(_.map(user.bacs || [], bac => {
          if(bac.baclevel == null || !bac.date) {
            return null;
          }
          return {
            x: new Date(bac.date),
            y: bac.baclevel
          };
        }))
      }
    ];

    var valid = user.userid != null && series[0].values.length > 0;

    return (
      <div className="mdl-cell mdl-cell--12-col">
        {user.firstname && user.lastname ?
          <h3 className="heading--no-margin">{`${user.firstname} ${user.lastname}`}</h3>
          : null
        }
        {valid ?
          <LineChart data={series}
                     height={300}
                     width={984}
                     colors={() => '#FF7F00'}
                     legend={false}
                     yAxisLabel="Blood alcohol level [&permil;]"
                     title="Blood alcohol level history" /> :
          <p>No blood alcohol level entries. Get drunk, bro!</p>
        }
        <div className="actions">
          <Link to={`/frontend/users/${user.userid}/edit`}
                className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent mdl-button--raised">
            Edit
          </Link>
          <button type="button" onClick={this.onDelete.bind(this)}
                  className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent mdl-button--raised">
            Delete
          </button>
        </div>
      </div>
    );
  }
}
