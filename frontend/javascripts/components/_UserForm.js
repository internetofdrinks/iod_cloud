import React from 'react';
import _ from 'lodash';
import UserStore from '../stores/_UserStore';
import TextField from './_Textfield';
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

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: _.clone(this.props.user)
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
    UserStore.saveUser(this.state.user, () => browserHistory.push("/"), () => alert('Yeah, that sucks.'));
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
        <div className="mdl-cell mdl-cell--6-col">
          <TextField subject={user} property="firstname" onChange={this.updateUserState.bind(this, "firstname")}>
            First name
          </TextField>
        </div>
        <div className="mdl-cell mdl-cell--6-col">
          <TextField subject={user} property="lastname" onChange={this.updateUserState.bind(this, "lastname")}>
            Last name
          </TextField>
        </div>

        <div className="mdl-cell mdl-cell--6-col">
          <TextField subject={user} property="userid" onChange={this.updateUserState.bind(this, "userid")}>
            User RFID
          </TextField>
        </div>
        <div className="mdl-cell mdl-cell--6-col">
          <TextField subject={user} property="email" onChange={this.updateUserState.bind(this, "email")}>
            E-Mail
          </TextField>
        </div>

        <div className="mdl-cell mdl-cell--12-col">
          <h5 className="heading--no-margin">General data</h5>
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