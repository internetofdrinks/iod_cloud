import React from 'react';

import _ from 'lodash';

export default class Slide extends React.Component {
  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  next() {
    var step = this.steps[this.state.nextStep];
    if(step) {
      _.each(step.remove, rm => {
        var parts = rm.split('.');
        _.remove(this.state[parts[0]], c => c == parts[1]);
      });
      _.each(step.add, rm => {
        var parts = rm.split('.');
        _.remove(this.state[parts[0]], c => c == parts[1]);
        this.state[parts[0]].push(parts[1]);
      });

      this.setState({
        nextStep: this.state.nextStep + 1
      });
    }
  }

  prev() {
    var step = this.steps[this.state.nextStep - 1];
    if(step) {
      _.each(step.add, rm => {
        var parts = rm.split('.');
        _.remove(this.state[parts[0]], c => c == parts[1]);
      });
      _.each(step.remove, rm => {
        var parts = rm.split('.');
        _.remove(this.state[parts[0]], c => c == parts[1]);
        this.state[parts[0]].push(parts[1]);
      });

      this.setState({
        nextStep: this.state.nextStep - 1
      });
    }
  }

  onKeyDown(event) {
    switch (event.keyCode) {
      case 37:    // Left
      case 38:    // Up
      case 33:    // Presenter left
        event.preventDefault();
        event.stopImmediatePropagation();
        this.prev();
        break;

      case 39:    // Right
      case 40:    // Down
      case 34:    // Presenter right
        event.preventDefault();
        event.stopImmediatePropagation();
        this.next();
        break;
    }
  }
}