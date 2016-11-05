import React from 'react';

export default class TextField extends React.Component {
  render() {
    var subject = this.props.subject;
    var property = this.props.property;
    var htmlId = property + '-field';
    var onChange = this.props.onChange;
    var value = subject[property];

    var classes = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label";
    if(value) {
      classes += " is-dirty";
    }

    return (
      <div className={classes}>
        <input className="mdl-textfield__input" type="text" id={htmlId} value={value || ''}
               onChange={onChange} />
        <label className="mdl-textfield__label" htmlFor={htmlId}>{this.props.children}</label>
      </div>
    );
  }
}
