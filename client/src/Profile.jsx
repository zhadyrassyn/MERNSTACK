import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchUser} from "./actions/actions";
import defaultAva from './images/defaultAva.png';

class Profile extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const user = this.props.user;

    return (
      <div>
        <h3>Hello, {user.firstName}, {user.lastName}</h3>

        <label htmlFor="fileInput">
          { !user.avaPath &&
          <img src={defaultAva} className="user-ava-img"/>
          }

          { user.avaPath &&
          <img src={"http://localhost:3001" + user.avaPath}
               className="user-ava-img"/>
          }
        </label>

        <input type="file" className="d-none" id="fileInput"/>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => {
      dispatch(fetchUser())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);