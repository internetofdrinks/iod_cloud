import React from 'react';
import _ from 'lodash';
import UserStore from '../stores/_UserStore';
import TextField from './_Textfield';
import RadioBox from './_RadioBox';
import { browserHistory } from 'react-router';

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

  // ID Vorname Nachname Email
  render() {
    let user = this.state.user;

    return (
      <form className="mdl-grid shadow-container" onSubmit={this.onSubmit.bind(this)}>
        <div className="mdl-cell mdl-cell--12-col">
          <h3 className="heading--no-margin">{user.isNew ? "New User" : `Edit User '${user.firstname} ${user.lastname}'`}</h3>
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
            <RadioBox subject={user} property={"gender"} value="female" onChange={this.updateUserState.bind(this, "gender")}>
              Female
            </RadioBox>
            <RadioBox subject={user} property={"gender"} value="male" onChange={this.updateUserState.bind(this, "gender")}>
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
            <RadioBox subject={user} property={"gametype"} value="constant" onChange={this.updateUserState.bind(this, "gametype")}>
              I want to stay at the optimum!
            </RadioBox>
            <RadioBox subject={user} property={"gametype"} value="sober" onChange={this.updateUserState.bind(this, "gametype")}>
              I want to be sober at ...
            </RadioBox>
          </div>
        </div>
        <div className="mdl-cell mdl-cell--6-col">
          {(user.gametype == 'constant') ?
            <TextField subject={user} property="goal" onChange={this.updateUserState.bind(this, "goal")}>
              Alcohol level goal [&permil;]
            </TextField> : null
          }
        </div>

        <div className="mdl-cell mdl-cell--12-col">
          <button type="submit"
                  className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent mdl-button--raised">
            Submit
          </button>
        </div>
      </form>
    );
  }
}
