import React from 'react';
import Header from './Header';
import axios from 'axios';
import { connect } from 'react-redux';

import { getPosts, savePost, deletePost, editPost } from "./actions/actions";

import './styles/index.css';

import defaultPostImage from './images/default.jpg';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showAddPostModal: false,
      addAuthor: '',
      addTitle: '',
      addContent: '',
      showEditModal: false,
      editAuthor: '',
      editTitle: '',
      editContent: '',
      editPostId: 0,
    };
  }

  componentDidMount() {
    this.props.getPosts();
  }

  showAddPostModalEvent() {
    this.setState({
      showAddPostModal: true
    });
  }

  closeAddPostModalEvent() {
    this.setState({
      showAddPostModal: false
    });
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  handleAddPostSubmit() {
    const addAuthor = this.state.addAuthor;
    const addTitle = this.state.addTitle;
    const addContent = this.state.addContent;

    // const { addAuthor, addTitle, addContent } = this.state;

    this.props.savePost(addAuthor, addTitle, addContent,
      () => {
        this.setState({
          showAddPostModal: false,
          addAuthor: '',
          addTitle: '',
          addContent: ''
        });
      });

    // axios.post('http://localhost:3001/api/posts', {
    //   author: addAuthor,
    //   title: addTitle,
    //   content: addContent
    // }).then((success) => {
    //
    //   const savedPost = success.data.savedPost;
    //   const posts = this.state.posts;
    //   posts.push(savedPost);
    //
    //   this.setState({
    //     posts: posts,
    //     showAddPostModal: false,
    //     addAuthor: '',
    //     addTitle: '',
    //     addContent: ''
    //   });
    //
    // }).catch((error) => {
    //   console.log(error);
    // });

  }

  handleDelete(deleteId) {
    this.props.deletePost(deleteId);
  };

  handleEdit = (post) => {
    const author = post.author;
    const title = post.title;
    const content = post.content;
    const id = post._id;
    this.setState({
      showEditModal: true,
      editAuthor: author,
      editTitle: title,
      editContent: content,
      editPostId: id
    });
  };

  handleEditShowModal = (event) => {
    event.preventDefault();
    const showEditModal = this.state.showEditModal;

    this.setState({
      showEditModal: !showEditModal,
      editAuthor: '',
      editTitle: '',
      editContent: '',
      editPostId: 0,
    });
  };

  handleEditPost = (event) => {
    event.preventDefault();
    const editAuthor = this.state.editAuthor;
    const editTitle = this.state.editTitle;
    const editContent = this.state.editContent;
    const editPostId = this.state.editPostId;

    const updatePost = {
      author: editAuthor,
      title: editTitle,
      content: editContent,
    };

    this.props.editPost(editPostId, updatePost, () => {
      this.setState({
        showEditModal: false,
        editAuthor: '',
        editTitle: '',
        editContent: '',
      });
    });
  };

  render() {
    const posts = this.props.posts;

    const addAuthor = this.state.props;
    const addTitle = this.state.props;
    const addContent = this.state.props;
    const showAddPostModal = this.state.showAddPostModal;

    const showEditModal = this.state.showEditModal;
    const editAuthor = this.state.editAuthor;
    const editTitle = this.state.editTitle;
    const editContent = this.state.editContent;

    return (
      <div className="px-2 py-2">

        <Header/>

        { showAddPostModal &&
        <div id="myModal" className="mymodal">
          <div className="mymodal-content">
            <div className="mymodal-header py-2">
              <h2>Добавить новый пост</h2>
              <span className="myclose" onClick={this.closeAddPostModalEvent.bind(this)}>&times;</span>
            </div>
            <div className="mymodal-body">
              <div className="input-group my-3">
                <input value={addAuthor} onChange={this.handleInputChange.bind(this)} name="addAuthor" type="text" placeholder="Enter author" className="form-control"/>
              </div>

              <div className="input-group">
                <input value={addTitle} onChange={this.handleInputChange.bind(this)} name="addTitle" type="text" placeholder="Enter title" className="form-control"/>
              </div>

              <div className="input-group my-3">
                <textarea value={addContent} onChange={this.handleInputChange.bind(this)} name="addContent" placeholder="Enter content" className="form-control">
                </textarea>
              </div>

            </div>
            <div className="mymodal-footer">
              <div className="my-2 text-right">
                <button className="btn btn-secondary mr-2" onClick={this.closeAddPostModalEvent.bind(this)}>Отменить</button>
                <button className="btn btn-primary" onClick={this.handleAddPostSubmit.bind(this)}>Добавить</button>
              </div>
            </div>
          </div>
        </div>
        }



        <div className="mb-2">
          <button className="btn btn-success" onClick={this.showAddPostModalEvent.bind(this)}>
            <i className="fas fa-plus"/>
          </button>
        </div>


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

                  <button className="btn btn-danger mx-2" onClick={this.handleDelete.bind(this, post._id)}>
                    <i className="fas fa-trash"/>
                  </button>
                  <button className="btn btn-warning" onClick={this.handleEdit.bind(this, post)}>
                    <i className="fas fa-pencil-alt"/>
                  </button>
                </li>
              )
            })
          }
        </ul>

        {showEditModal &&
        <div className="mymodal">
          <div className="mymodal-content">
            <div className="mymodal-header py-2">
              <h2>Отредактировать пост</h2>
              <span className="myclose" onClick={this.handleEditShowModal.bind(this)}>&times;</span>
            </div>
            <div className="mymodal-body">
              <div className="input-group my-3">
                <input type="text" className="form-control" name="editAuthor" placeholder="Author"
                       onChange={this.handleInputChange.bind(this)} value={editAuthor}/>
              </div>
              <div className="input-group">
                <input type="text" className="form-control" name="editTitle" placeholder="Title"
                       onChange={this.handleInputChange.bind(this)} value={editTitle}/>
              </div>
              <div className="input-group my-3">
                <textarea type="text" className="form-control" name="editContent" placeholder="Content..."
                          onChange={this.handleInputChange.bind(this)} value={editContent}/>
              </div>
            </div>
            <div className="mymodal-footer">
              <div className="my-2">
                <button className="btn btn-secondary mr-2" onClick={this.handleEditShowModal.bind(this)}>Отменить</button>
                <button className="btn btn-success" onClick={this.handleEditPost.bind(this)}>Изменить</button>
              </div>
            </div>
          </div>
        </div>
        }
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

    savePost: (addAuthor, addTitle, addContent, changeState) => {
      dispatch(savePost(addAuthor, addTitle, addContent, changeState))
    },

    editPost: (id, newPost, changeState) => {
      dispatch(editPost(id, newPost, changeState));
    },

    deletePost: (id) => {
      dispatch(deletePost(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);