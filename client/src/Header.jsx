import React from 'react';
import  { Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import { signOut } from "./actions/actions";

import { withRouter } from 'react-router-dom';

import { getTokenData } from "./utils/utils";

class Header extends React.Component {

  handleSignOut(event) {
    event.preventDefault();

    this.props.signOut(() => {
      this.props.history.push('/');
    });
  }

  render() {
    const tokenData = getTokenData(localStorage.getItem('token'));

    const authenticated = this.props.authenticated;

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
              <NavLink className="nav-item nav-link" exact activeClassName="active" to="/favourites">Favourites</NavLink>
              { !authenticated &&
              <NavLink className="nav-item nav-link" exact activeClassName="active" to="/signin">Sign in</NavLink>
              }

              { !authenticated &&
              <a className="nav-item nav-link" href="#">Sign up</a>
              }

              { authenticated &&
              <NavLink
                className="nav-item nav-link"
                exact activeClassName="active"
                to={"/profile/" + tokenData.id}>
                {tokenData.firstName}
              </NavLink>
              }

              { authenticated &&
              <a className="nav-item nav-link" href="#"
              onClick={this.handleSignOut.bind(this)} >Sign out</a>
              }
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.users.authenticated
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: (successCallback) => {
      dispatch(signOut(successCallback));
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));