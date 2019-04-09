import React from 'react';
import { connect } from 'react-redux';

import { fetchPosts, changeSearchParams } from "./actions/actions";

import './styles/index.css';

import { Link } from 'react-router-dom';

import defaultPostImage from './images/default.jpg';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const perPage = this.props.perPage;
    const currentPage = this.props.currentPage;
    this.props.fetchPosts(perPage, currentPage);
  }

  changePage = (title) => {
    const page = parseInt(title);

    const perPage = this.props.perPage;
    const searchText = this.props.searchText;

    this.props.fetchPosts(perPage, page, searchText, () => {
      this.props.changeSearchParams(page, searchText);
    });
  };

  render() {
    const posts = this.props.posts;

    const total = this.props.total;
    const perPage = this.props.perPage;
    const currentPage = this.props.currentPage;

    const totalAmount = Math.ceil(total / perPage);
    const pages = [];
    for(let i = 1; i <= totalAmount; i++) {
      if (i == 1 || i == totalAmount || i == currentPage) {
        pages.push({
          title: i
        })
      } else if(currentPage - 2 <= i && currentPage + 2 >= i) {
        pages.push({
          title: i
        })
      }
    }

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
                  {post.author && post.author.firstName || ""},
                  {post.author && post.author.lastName || ""},
                  {post.content}

                  <Link to={"/detail/" + post._id} className="btn btn-secondary ml-2">
                    <i className="fas fa-eye"/>
                  </Link>
                </li>
              )
            })
          }
        </ul>

        <ul className="pagination">

          {pages.map(page => {
            const title = page.title;
            return (
                <li className={`page-item ${title === currentPage ? "active" : ""}`}>
                  <a className="page-link active" onClick={this.changePage.bind(this, title)}>{page.title}</a>
                </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    total: state.posts.total,
    perPage: state.posts.perPage,
    currentPage: state.posts.currentPage,
    searchText: state.posts.searchText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: (perPage, currentPage, searchText, successCallback) =>
        dispatch(fetchPosts(perPage, currentPage, searchText, successCallback)),
    changeSearchParams: (page, searchText) =>
      dispatch(changeSearchParams(page, searchText))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);