import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchUser,
  fetchUserPosts,
  saveUserPost,
  editUserPost,
  deleteUserPost,
  updateUserAva
} from "./actions/actions";
import defaultAva from './images/defaultAva.png';
import defaultPostImage from './images/default.jpg';
import { Link } from 'react-router-dom';

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showAddPostModal: false,
      addAuthor: '',
      addTitle: '',
      addContent: '',
      saveFile: null,
      showEditModal: false,
      editAuthor: '',
      editTitle: '',
      editContent: '',
      editPostId: 0,
      editImage: null,
      editSaveFile: null
    };
  }

  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchUserPosts();
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
    const image = this.state.saveFile;

    this.props.savePost(addAuthor, addTitle, addContent, image,
      () => {
        this.setState({
          showAddPostModal: false,
          addAuthor: '',
          addTitle: '',
          addContent: '',
          saveFile: null
        });
      });
  }

  handleDelete(deleteId) {
    this.props.deletePost(deleteId);
  };

  handleFileChange(event) {
    this.setState({
      saveFile: event.target.files[0],
    });
  }

  handleEdit = (post) => {
    const author = post.author;
    const title = post.title;
    const content = post.content;
    const id = post._id;
    const image = post.image;
    this.setState({
      showEditModal: true,
      editAuthor: author,
      editTitle: title,
      editContent: content,
      editPostId: id,
      editImage: image,
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
    const editSaveFile = this.state.editSaveFile;

    const updatePost = {
      author: editAuthor,
      title: editTitle,
      content: editContent,
      file: editSaveFile,
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

  handleEditFileImage(event) {
    this.setState({
      editSaveFile: event.target.files[0]
    })
  }

  handleAvatarChange(event) {
    const file = event.target.files[0];
    this.props.updateUserAva(file);
  }

  render() {
    const user = this.props.user;
    const posts = this.props.posts;

    const addAuthor = this.state.props;
    const addTitle = this.state.props;
    const addContent = this.state.props;
    const showAddPostModal = this.state.showAddPostModal;

    const showEditModal = this.state.showEditModal;
    const editAuthor = this.state.editAuthor;
    const editTitle = this.state.editTitle;
    const editContent = this.state.editContent;

    const editImage = this.state.editImage;
    const editSaveFile = this.state.editSaveFile;

    return (
      <div>
        <h3>Hello, {user.firstName}, {user.lastName}</h3>

        <label htmlFor="fileInput">
          { !user.avaPath &&
          <img src={defaultAva} className="user-ava-img"/>
          }

          { user.avaPath && //123.jpg?cb=22:33:01
          <img src={"http://localhost:3001" + user.avaPath + "?cb=" + (new Date().toTimeString())}
               className="user-ava-img"/>
          }
        </label>

        <input type="file" className="d-none" id="fileInput"
         onChange={this.handleAvatarChange.bind(this)}
        />

        <div className="px-2 py-2">

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

                <div className="input-group mt-3">
                  <input type="file" onChange={this.handleFileChange.bind(this)}/>
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
                    <Link to={"/detail/" + post._id} className="btn btn-secondary ml-2">
                      <i className="fas fa-eye"/>
                    </Link>
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
                <div className="input-group mt-3">
                  <label htmlFor="editFile">
                    { editImage &&
                    <img src={editImage} alt="Post image" className="editPostImage"/>
                    }

                    { !editImage &&
                    <img src={defaultPostImage} alt="Post image" className="editPostImage"/>
                    }
                  </label>
                  {editSaveFile && <span className="text-success">File chosen!</span>}
                  <input type="file" id="editFile" className="d-none" onChange={this.handleEditFileImage.bind(this)}/>
                </div>
                <div className="input-group mt-3">
                  <input type="text" className="form-control" name="editAuthor" placeholder="Author"
                         onChange={this.handleInputChange.bind(this)} value={editAuthor}/>
                </div>
                <div className="input-group mt-3">
                  <input type="text" className="form-control" name="editTitle" placeholder="Title"
                         onChange={this.handleInputChange.bind(this)} value={editTitle}/>
                </div>
                <div className="input-group mt-3">
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

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
    posts: state.users.posts,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => {
      dispatch(fetchUser());
    },
    fetchUserPosts: () => {
      dispatch(fetchUserPosts());
    },
    savePost: (addAuthor, addTitle, addContent, saveImage, changeState) => {
      dispatch(saveUserPost(addAuthor, addTitle, addContent, saveImage, changeState))
    },

    editPost: (id, newPost, changeState) => {
      dispatch(editUserPost(id, newPost, changeState));
    },

    deletePost: (id) => {
      dispatch(deleteUserPost(id));
    },

    updateUserAva: (file) => {
      dispatch(updateUserAva(file));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);