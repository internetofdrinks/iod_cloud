import $ from 'jquery';
import _ from 'lodash';
import Events from '../util/_EventEmitter';

function UserStore() {
  this.users = [];
  this.usersById = {};
  this.bacs = {};

  $.ajax({
    method: 'GET',
    url: '/users',
    success: users => {
      this.users = users;
      this.usersById = _.keyBy(users, 'userid');
      Events.emit(this.CHANGE_EVENT);
    }
  });

  this.CHANGE_EVENT = 'change';

  this.getUsers = function () {
    return this.users;
  };

  this.getUser = function(id) {
    return _.assign({
      bacs: this.bacs[id]
    }, this.usersById[id]);
  };

  this.fetchUser = function(id) {
    $.ajax({
      method: 'GET',
      url: '/bac/' + id,
      success: bacs => {
        this.bacs[id] = bacs;
        Events.emit(this.CHANGE_EVENT);
      }
    });
  };

  this.saveUser = function (user, success, error) {
    var oldId = user.userid;

    $.ajax({
      method: 'POST',
      url: user.isNew ? '/users' : `/users/${user.userid}`,
      data: JSON.stringify(user),
      success: user => {
        _.remove(this.users, u => u.userid == oldId);
        this.users.push(user);
        this.usersById[user.userid] = user;
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
