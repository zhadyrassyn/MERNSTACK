import React from 'react';
import { connect } from 'react-redux';

import { getPosts } from "./actions/actions";

import './styles/index.css';

import { Link } from 'react-router-dom';

import defaultPostImage from './images/default.jpg';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const posts = this.props.posts;

    return (
      <div className="px-2 py-2">

        <ul className="list-group">
          {
            posts.map((post) => {
              return (
                <li key={post._id} className="list-group-item" >
                  { post.image &&
                    <img src={post.image} alt="Post image"/>
                  }

                  { !post.image &&
                    <img src={defaultPostImage} alt="Post image"/>
                  }

                  {post.title},
                  {post.author},
                  {post.content}

                  <Link to={"/detail/" + post._id} className="btn btn-secondary ml-2">
                    <i className="fas fa-eye"/>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => {
      dispatch(getPosts())
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);