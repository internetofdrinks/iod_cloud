import _ from 'lodash';

const events = {};

function getListeners(event) {
  let listeners = events[event];
  if (!listeners) {
    events[event] = listeners = [];
  }
  return listeners;
}

export default {
  addListener(event, func) {
    getListeners(event).push(func);
  },

  removeListener(event, func) {
    _.pull(getListeners(event), func);
  },

  emit(event, ...args) {
    _.each(getListeners(event), l => l(...args));
  }
};