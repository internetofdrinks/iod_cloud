import React from 'react';
import UserStore from '../stores/_UserStore';
import Events from '../util/_EventEmitter';
import _ from 'lodash';
import $ from 'jquery';
import moment from 'moment';
import {browserHistory} from 'react-router';

import {Link} from 'react-router';
import {LineChart} from 'react-d3';

export default class ShowUser extends React.Component {
  constructor(props) {
    super(props);

    this.goalQueried = false;
    this.state = {
      user: UserStore.getUser(this.props.params.id)
    };

    this.updateState = this.updateState.bind(this);

    UserStore.fetchUser(this.props.params.id);
  }

  componentDidMount() {
    Events.addListener(UserStore.CHANGE_EVENT, this.updateState);
    this.checkGoalQuery();
  }

  componentDidUpdate() {
    this.checkGoalQuery();
  }

  componentWillUnmount() {
    Events.removeListener(UserStore.CHANGE_EVENT, this.updateState)
  }

  checkGoalQuery() {
    if (!this.goalQueried) {
      var user = this.state.user;
      var constant = user.gametype == 'constant';
      if (user.userid && user.bacs && user.bacs.length > 0) {
        if (constant) {
          $.ajax({
            method: 'GET',
            url: '/alccalc/' + user.userid,
            success: data => {
              this.goalQueried = true;
              this.setState({
                constantQuery: data
              });
            }
          });
        } else {
          var hoursToGo = moment.duration(moment.unix(user.timegoal).diff(moment())).asHours();
          $.ajax({
            method: 'GET',
            url: '/alccalc/' + user.userid + '/' + hoursToGo,
            success: data => {
              this.goalQueried = true;
              this.setState({
                soberQuery: data
              });
            }
          });
        }
      }
    }
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
          if (bac.baclevel == null || !bac.date) {
            return null;
          }
          return {
            x: new Date(bac.date),
            y: bac.baclevel
          };
        }))
      }
    ];

    if (user.gametype == 'constant' && user.bacs && user.bacs.length >= 2) {
      series.push({
        name: 'Alcohol level goal',
        strokeWidth: 2,
        strokeDashArray: "5,5",
        values: [
          {x: new Date(user.bacs[0].date), y: user.goal},
          {x: new Date(_.last(user.bacs).date), y: user.goal}
        ]
      });
    } else if(user.gametype == 'sober' && user.bacs && user.bacs.length > 0 && user.timegoal && this.state.soberQuery) {
      if(_.last(user.bacs).baclevel > 0.3) {
        series.push({
          name: 'Alcohol level goal',
          strokeWidth: 2,
          strokeDashArray: "5,5",
          values: [
            {x: new Date(_.last(user.bacs).date), y: _.last(user.bacs).baclevel },
            {x: moment().add(this.state.soberQuery.time_to_sober, 'hours').toDate(), y: 0.3}
          ]
        });
      }
    }

    var valid = user.userid != null && series[0].values.length > 0;

    function formatHours(hours) {
      return moment().startOf('day').add(hours, 'hours').format('HH:mm');
    }

    return (
      <div className="mdl-cell mdl-cell--12-col shadow-container">
        {user.firstname && user.lastname ?
          <h3 className="heading--no-margin">{`${user.firstname} ${user.lastname}`}</h3>
          : null
        }
        {valid ?
          <div>
            <LineChart data={series}
                       height={300}
                       width={952}
                       colors={i => i == 0 ? '#FF7F00' : '#0566DC'}
                       legend={true}
                       yAxisLabel="Blood alcohol level [&permil;]"
                       title="Blood alcohol level history"/>
          </div> :
          <p>No blood alcohol level entries. Get drunk, bro!</p>
        }
        <div className="user__goal-overview mdl-grid">
          <h4 className="mdl-cell mdl-cell--4-col">
            <strong>User goal:&nbsp;</strong>
          </h4>
          <h4 className="mdl-cell mdl-cell--8-col">
            {user.gametype == 'constant' ?
              `Stay at ${user.goal}\u2030` :
              `Be sober enough to drive at ${moment.unix(user.timegoal).format('HH:mm')}`}
          </h4>

          <h4 className="mdl-cell mdl-cell--4-col">
            <strong>Status info:</strong>
          </h4>
          <h4 className="mdl-cell mdl-cell--8-col">
            {user.gametype == 'constant' ?
              this.state.constantQuery ?
                this.state.constantQuery.amount_in_liter > 0 ?
                  <div>
                    <div className="good">Go ahead, drink {this.state.constantQuery.amount_in_liter} liters of beer to reach the perfect level!</div>
                    <div className="glasses" style={{ width: this.state.constantQuery.amount_in_glasses * 50 }}></div>
                  </div> :
                  <span className="bad">You're above the limit, relax a bit and check back later! It'll take
                    you {formatHours(this.state.constantQuery.time_to_sober)} hours to reach your level.
                  </span>
                : null
              :
              this.state.soberQuery ?
                this.state.soberQuery.sober ?
                  <div>
                    <span className="good">Don't worry, you'll be sober in {formatHours(this.state.soberQuery.time_to_sober)} hours.
                      You can even drink up to {this.state.soberQuery.amount_in_liter} liters of beer and still make it!</span>
                    <div className="glasses" style={{ width: this.state.soberQuery.amount_in_glasses * 50 }}></div>
                  </div> :
                  <span className="bad">This won't work out, it'll take you {formatHours(this.state.soberQuery.time_to_sober)} hours to sober up!</span>
                : null
            }
          </h4>
        </div>
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
