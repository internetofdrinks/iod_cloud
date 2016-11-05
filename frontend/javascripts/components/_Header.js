import React from 'react';
import { Link } from 'react-router';

export default class Header extends React.Component {
  render() {
    return (
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <Link to="/" className="mdl-layout-title mdl-navigation__link">IoD - Internet of Drinks!</Link>
          <div className="mdl-layout-spacer"></div>
          <nav className="mdl-navigation mdl-layout--large-screen-only">
            <Link to="/" className="mdl-navigation__link" onlyActiveOnIndex={true}
                  activeClassName="mdl-navigation__link--active">
              Dashboard
            </Link>
            {/*<a className="mdl-navigation__link" href="">Link</a>*/}
            {/*<a className="mdl-navigation__link" href="">Link</a>*/}
            {/*<a className="mdl-navigation__link" href="">Link</a>*/}
            {/*<a className="mdl-navigation__link" href="">Link</a>*/}
          </nav>
        </div>
      </header>
    );
  }
}
