import $ from 'jquery';
import _ from 'lodash';
import Events from '../util/_EventEmitter';

function UserStore() {
  this.users = [];

  this.CHANGE_EVENT = 'change';

  this.getUsers = function () {
    return this.users;
  };

  this.saveUser = function (user) {
    $.ajax({
      method: 'POST',
      url: '/user',
      data: JSON.stringify(user),
      success: user => {
        _.remove(this.users, u => u.userid == user.userid);
        this.users.push(user);
        Events.emit(this.CHANGE_EVENT);
      }
    });
  };
}

export default new UserStore();
