import React from 'react';

import {connect} from 'react-redux';

import { signin } from "./actions/actions";

class Signin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleInputChange(event) {
    const name = event.target.name; //email, password
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;

    this.props.signin(email, password);
  }


  render() {
    const email = this.state.email;
    const password = this.state.password;

    return (
      <div className="signin-body">
        <form className="signin-form">
          <div className="signin-form-body">
            <h3 className="text-center">Sign in</h3>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input name="email" value={email} onChange={this.handleInputChange.bind(this)}
                     type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input name="password" value={password} onChange={this.handleInputChange.bind(this)}
                     type="password" className="form-control" id="password" placeholder="Password"/>
            </div>
          </div>

          <button type="submit" className="btn btn-primary signin-btn" onClick={this.handleSubmit.bind(this)}>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signin: (email, password) => {
      dispatch(signin(email, password));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
