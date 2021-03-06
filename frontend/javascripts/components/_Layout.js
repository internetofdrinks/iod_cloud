import React from 'react';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        {this.props.header}
        <div className={"layout__body" + (this.props.fullHeight ? ' layout__body--full-height' : '')}>
          <div className={"layout__content mdl-grid" + (this.props.wide ? ' layout__content--wide' : '')}>
            {this.props.content}
          </div>
        </div>
      </div>
    );
  }
}
