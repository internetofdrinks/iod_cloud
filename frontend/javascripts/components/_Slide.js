import React from 'react';

import _ from 'lodash';

import DbResetter from '../util/_DbResetter';

import { browserHistory } from 'react-router';

export default class Slide extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  next() {
    var steps = this.steps || [];
    var nextStep = this.state.nextStep || 0;

    var step = steps[nextStep];
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
    } else if(this.nextUrl) {
      browserHistory.push(this.nextUrl);
    }
  }

  prev() {
    var steps = this.steps || [];
    var nextStep = this.state.nextStep || 0;

    var step = steps[nextStep - 1];
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
    } else if(this.prevUrl) {
      browserHistory.push(this.prevUrl);
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

      case 48:    // 0
        if(event.ctrlKey) {
          console.log("Resetting BACs ...");
          DbResetter.resetBacs();
        }
        break;

      case 49:    // 1
        console.log("Adding martin's BAC");
        DbResetter.submitMartinBac();
        break;
    }
  }
}