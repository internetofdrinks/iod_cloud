import React from 'react';
import _ from 'lodash';
import UserStore from '../stores/_UserStore';
import { browserHistory } from 'react-router';

export default class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.fields = [];
    this.state = {
      user: _.clone(this.props.user)
    };
  }

  componentDidMount() {
    componentHandler.upgradeDom();
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
    return (
      <form className="mdl-grid shadow-container" onSubmit={this.onSubmit.bind(this)}>
        <div className="mdl-cell mdl-cell--12-col">
          <h3 className="heading--no-margin">New User</h3>
        </div>
        <div className="mdl-cell mdl-cell--6-col">
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input className="mdl-textfield__input" type="text" id="first-name"
                   onChange={this.updateUserState.bind(this, "firstname")} />
            <label className="mdl-textfield__label" htmlFor="first-name">First name</label>
          </div>
        </div>
        <div className="mdl-cell mdl-cell--6-col">
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input className="mdl-textfield__input" type="text" id="last-name"
                   onChange={this.updateUserState.bind(this, "lastname")} />
            <label className="mdl-textfield__label" htmlFor="last-name">Last name</label>
          </div>
        </div>

        <div className="mdl-cell mdl-cell--6-col">
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input className="mdl-textfield__input" type="text" id="rfid"
                   onChange={this.updateUserState.bind(this, "userid")} />
            <label className="mdl-textfield__label" htmlFor="rfid">User RFID</label>
          </div>
        </div>
        <div className="mdl-cell mdl-cell--6-col">
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
               onChange={this.updateUserState.bind(this, "email")} >
            <input className="mdl-textfield__input" type="text" id="email"/>
            <label className="mdl-textfield__label" htmlFor="email">E-Mail</label>
          </div>
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