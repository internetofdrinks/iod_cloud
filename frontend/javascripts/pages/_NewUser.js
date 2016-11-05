import React from 'react';
import UserForm from '../components/_UserForm';
import $ from 'jquery';

export default class NewUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: null
    };

    $.ajax({
      method: 'GET',
      url: '/ids/latest',
      success: id => {
        this.setState({
          userid: id.userid
        });
      }
    })
  }

  render() {
    return (
      <div className="mdl-cell mdl-cell--12-col">
        <UserForm user={{
          isNew: true,
          userid: this.state.userid
        }} />
      </div>
    );
  }
}
