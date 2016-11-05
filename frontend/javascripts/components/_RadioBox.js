import React from 'react';

export default class RadioBox extends React.Component {
  componentDidUpdate() {
    var radio = this.checkbox.MaterialRadio;
    if(this.props.subject[this.props.property] == this.props.value) {
      radio.check();
    } else {
      radio.uncheck();
    }
  }

  render() {
    var subject = this.props.subject;
    var property = this.props.property;
    var value = this.props.value;
    var htmlId = "check-" + value;
    var onChange = this.props.onChange;
    var currentVal = subject[property];

    return (
      <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor={htmlId} ref={e => this.checkbox = e}>
        <input type="radio" id={htmlId} className="mdl-radio__button" name={property}
               value={value} onChange={onChange} checked={value == currentVal} />
        <span className="mdl-radio__label">{this.props.children}</span>
      </label>
    );
  }
}
