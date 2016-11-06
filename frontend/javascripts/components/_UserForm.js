import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import UserStore from '../stores/_UserStore';
import TextField from './_Textfield';
import RadioBox from './_RadioBox';
import TimePicker from 'rc-time-picker';

import {Link} from 'react-router';

import {browserHistory} from 'react-router';

export default class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: _.clone(this.props.user)
    }
  }

  componentDidMount() {
    componentHandler.upgradeDom();
  }

  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: _.clone(nextProps.user)
    });
  }

  updateUserState(property, event) {
    this.state.user[property] = event.currentTarget.value;
    this.setState({
      user: this.state.user
    });
  }

  onSubmit(e) {
    e.preventDefault();
    UserStore.saveUser(this.state.user,
      () => browserHistory.push("/frontend/users/" + this.state.user.userid),
      () => alert('Yeah, that sucks.'));
  }

  onTimeChange(time) {
    if (time && time.isBefore(moment())) {
      time.add(1, 'days');
    }
    this.state.user.timegoal = time && time.unix();
    this.setState({
      user: this.state.user
    });
  }

  // ID Vorname Nachname Email
  render() {
    let user = this.state.user;

    var timeGoal = this.state.user.timegoal ? moment.unix(this.state.user.timegoal) : moment().add(3, 'hours').startOf('hour');

    return (
      <form className="mdl-grid shadow-container" onSubmit={this.onSubmit.bind(this)}>
        <div className="mdl-cell mdl-cell--12-col">
          <h3
            className="heading--no-margin">{user.isNew ? "New User" : `Edit User '${user.firstname} ${user.lastname}'`}</h3>
        </div>
        <div className="mdl-cell mdl-cell--12-col">
          <h5 className="heading--no-margin">General data</h5>
        </div>
        <div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
          <TextField subject={user} property="firstname" onChange={this.updateUserState.bind(this, "firstname")}>
            First name
          </TextField>
        </div>
        <div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
          <TextField subject={user} property="lastname" onChange={this.updateUserState.bind(this, "lastname")}>
            Last name
          </TextField>
        </div>

        <div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
          <TextField subject={user} property="userid" onChange={this.updateUserState.bind(this, "userid")}>
            User RFID
          </TextField>
        </div>
        <div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
          <TextField subject={user} property="email" onChange={this.updateUserState.bind(this, "email")}>
            E-Mail
          </TextField>
        </div>

        <div className="mdl-cell mdl-cell--12-col">
          <h5 className="heading--no-margin">Personal data</h5>
        </div>

        <div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
          <TextField subject={user} property="height" onChange={this.updateUserState.bind(this, "height")}>
            Height
          </TextField>
        </div>
        <div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
          <TextField subject={user} property="weight" onChange={this.updateUserState.bind(this, "weight")}>
            Weight
          </TextField>
        </div>

        <div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
          <label className="label">Gender</label>
          <div className="radio-group">
            <RadioBox subject={user} property={"gender"} value="female"
                      onChange={this.updateUserState.bind(this, "gender")}>
              Female
            </RadioBox>
            <RadioBox subject={user} property={"gender"} value="male"
                      onChange={this.updateUserState.bind(this, "gender")}>
              Male
            </RadioBox>
          </div>
        </div>
        <div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
          <TextField subject={user} property="age" onChange={this.updateUserState.bind(this, "age")}>
            Age
          </TextField>
        </div>

        <div className="mdl-cell mdl-cell--12-col">
          <h5 className="heading--no-margin">Goals</h5>
        </div>

        <div className="mdl-cell mdl-cell--6-col">
          <label className="label">Goal type</label>
          <div className="radio-group">
            <RadioBox subject={user} property={"gametype"} value="constant"
                      onChange={this.updateUserState.bind(this, "gametype")}>
              I want to stay at the optimum!
            </RadioBox>
            <RadioBox subject={user} property={"gametype"} value="sober"
                      onChange={this.updateUserState.bind(this, "gametype")}>
              I want to be sober at ...
            </RadioBox>
          </div>
        </div>
        <div className="mdl-cell mdl-cell--6-col">
          {(user.gametype == 'constant') ?
            <TextField subject={user} property="goal" onChange={this.updateUserState.bind(this, "goal")}>
              Alcohol level goal [&permil;]
            </TextField> :
            <div>
              <label className="label">Time you want to be sober</label>
              <div>
                <TimePicker showSecond={false}
                            style={{width: 100}}
                            onChange={this.onTimeChange.bind(this)}
                            value={timeGoal}/>
              </div>
            </div>
          }
        </div>

        <div className="mdl-cell mdl-cell--12-col actions">
          <button type="submit"
                  className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent mdl-button--raised">
            Submit
          </button>
          <Link to={"/frontend/users/" + user.userid}
                className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent mdl-button--raised">
            Cancel
          </Link>
        </div>
      </form>
    );
  }
}
