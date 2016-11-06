import $ from 'jquery';
import _ from 'lodash';
import Events from '../util/_EventEmitter';

function UserStore() {
  this.usersById = {};
  this.bacs = {};
  this.leaders = [];

  this.CHANGE_EVENT = 'change';

  this.getUsers = function () {
    var values = _.values(this.usersById);
    values.sort((a, b) => a.firstname.localeCompare(b.firstname));
    return _.map(values, user => {
      return _.assign({
        bacs: this.bacs[user.userid]
      }, user);
    });
  };

  this.getUser = function(id) {
    return _.assign({
      bacs: this.bacs[id]
    }, this.usersById[id]);
  };

  this.getLeaders = function() {
    return this.leaders;
  };

  this.fetchUsers = function() {
    $.ajax({
      method: 'GET',
      url: '/users',
      success: users => {
        this.usersById = _.keyBy(users, 'userid');
        Events.emit(this.CHANGE_EVENT);
      }
    });

    // BACs
    $.ajax({
      method: 'GET',
      url: '/bac',
      success: bacs => {
        this.bacs = _.groupBy(bacs, 'userid');
        Events.emit(this.CHANGE_EVENT);
      }
    });
  };

  this.fetchUser = function(id) {
    $.ajax({
      method: 'GET',
      url: '/users/' + id,
      success: user => {
        this.usersById[user.userid] = user;
        Events.emit(this.CHANGE_EVENT);
      }
    });

    $.ajax({
      method: 'GET',
      url: '/bac/' + id,
      success: bacs => {
        this.bacs[id] = bacs;
        Events.emit(this.CHANGE_EVENT);
      }
    });
  };

  this.fetchLeaders = function() {
    $.ajax({
      method: 'GET',
      url: '/alccalc/leader',
      success: leaders => {
        this.leaders = leaders;
        Events.emit(this.CHANGE_EVENT);
      }
    });
  };

  this.saveUser = function (user, success, error) {
    $.ajax({
      method: user.isNew ? 'POST' : 'PUT',
      url: user.isNew ? '/users' : `/users/${user.userid}`,
      contentType: 'application/json',
      data: JSON.stringify(user),
      success: user => {
        this.usersById[user.userid] = user;
        Events.emit(this.CHANGE_EVENT);
        if(success) success();
      },
      error: () => {
        if(error) error();
      }
    });
  };

  this.deleteUser = function(id, success, error) {
    $.ajax({
      method: 'DELETE',
      url: `/users/${id}`,
      success: () => {
        delete this.usersById[id];
        if(success) success();
      },
      error: () => {
        if(error) error();
      }
    });
  }
}

export default new UserStore();
