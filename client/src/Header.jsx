import React from 'react';
import  { Link, NavLink } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">Logo</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-item nav-link" exact activeClassName="active" to="/">Home <span class="sr-only">(current)</span></NavLink>
              <NavLink className="nav-item nav-link" exact activeClassName="active" to="/signin">Sign in</NavLink>
              <a className="nav-item nav-link" href="#">Sign up</a>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

export default Header;