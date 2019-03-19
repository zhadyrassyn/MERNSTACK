import React from 'react';
import { connect } from 'react-redux';

import { getPosts, addToFavourites } from "./actions/actions";

import './styles/index.css';

import { Link } from 'react-router-dom';

import defaultPostImage from './images/default.jpg';

import { withRouter } from 'react-router-dom';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPosts();
  }

  addToFavourites(movieId) {
    const movieToAdd = this.props.movies.find(movie => movie.id === movieId);
    this.props.addToFavourites(movieToAdd);
    this.props.history.push('/favourites');
  }

  render() {
    const posts = this.props.posts;

    const movies = this.props.movies;

    return (
      <div className="px-2 py-2">

        <ul className="list-group">
          {
            movies.map(movie => {
            return (
              <li key={movie.id} className="list-group-item" >
                {movie.id}
                {movie.name}
                <button onClick={this.addToFavourites.bind(this, movie.id)}>Add</button>
              </li>
            )
          })
          }
        </ul>

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
    posts: state.posts.posts,
    movies: state.movies.movies
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => {
      dispatch(getPosts())
    },
    addToFavourites: (movie) => {
      dispatch(addToFavourites(movie));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));