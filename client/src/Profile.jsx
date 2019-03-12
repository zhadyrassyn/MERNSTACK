import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchUser} from "./actions/actions";


class Profile extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const user = this.props.user;
    console.log('user ', user);

    return (
      <div>
        Profile page
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