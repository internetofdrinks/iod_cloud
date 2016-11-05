import React from 'react';
import { Link } from 'react-router';

export default class Header extends React.Component {
  render() {
    return (
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <Link to="/" className="mdl-layout-title mdl-navigation__link">
            <img src="/public/images/logo.png" className="logo" />
            IoD - Internet of Drinks!
          </Link>
          <div className="mdl-layout-spacer"></div>
          <nav className="mdl-navigation mdl-layout--large-screen-only">
            <Link to="/" className="mdl-navigation__link" onlyActiveOnIndex={true}
                  activeClassName="mdl-navigation__link--active">
              Dashboard
            </Link>
            <Link to="/frontend/users" className="mdl-navigation__link"
                  activeClassName="mdl-navigation__link--active">
              Users
            </Link>
          </nav>
        </div>
      </header>
    );
  }
}
