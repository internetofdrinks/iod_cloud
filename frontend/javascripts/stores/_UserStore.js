import $ from 'jquery';
import _ from 'lodash';
import Events from '../util/_EventEmitter';

function UserStore() {
  this.users = [];

  $.ajax({
    method: 'GET',
    url: '/users',
    success: users => {
      this.users = users;
      Events.emit(this.CHANGE_EVENT);
    }
  });

  this.CHANGE_EVENT = 'change';

  this.getUsers = function () {
    return this.users;
  };

  this.saveUser = function (user, success, error) {
    $.ajax({
      method: 'POST',
      url: '/user',
      data: JSON.stringify(user),
      success: user => {
        _.remove(this.users, u => u.userid == user.userid);
        this.users.push(user);
        Events.emit(this.CHANGE_EVENT);
        if(success) success();
      },
      error: () => {
        if(error) error();
      }
    });
  };
}

export default new UserStore();
