import React from 'react';
import Header from './Header';
import axios from 'axios';

import './styles/index.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      showAddPostModal: false,
      addAuthor: '',
      addTitle: '',
      addContent: '',
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/posts')
      .then((response) => {
        console.log(response);
        this.setState({
          posts: response.data.posts,
        });
      }).catch((error) => {
        console.log(error);
    })
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

    axios.post('http://localhost:3001/api/posts', {
      author: addAuthor,
      title: addTitle,
      content: addContent
    }).then((success) => {

      const savedPost = success.data.savedPost;
      const posts = this.state.posts;
      posts.push(savedPost);

      this.setState({
        posts: posts,
        showAddPostModal: false,
        addAuthor: '',
        addTitle: '',
        addContent: ''
      });

    }).catch((error) => {
      console.log(error);
    });

  }

  render() {
    const posts = this.state.posts;

    const showAddPostModal = this.state.showAddPostModal;

    return (
      <div>
        <Header/>

        { showAddPostModal &&
        <div id="myModal" className="mymodal">
          <div className="mymodal-content">
            <div className="mymodal-header">
              <span className="myclose" onClick={this.closeAddPostModalEvent.bind(this)}>&times;</span>
              <h2>Добавить новый пост</h2>
            </div>
            <div className="mymodal-body">
              <input onChange={this.handleInputChange.bind(this)} name="addAuthor" type="text" placeholder="Enter author" className="form-control"/>
              <input onChange={this.handleInputChange.bind(this)} name="addTitle" type="text" placeholder="Enter title" className="form-control"/>
              <textarea onChange={this.handleInputChange.bind(this)} name="addContent" placeholder="Enter content" className="form-control">
              </textarea>
            </div>
            <div className="mymodal-footer">
              <button className="btn btn-dark" onClick={this.closeAddPostModalEvent.bind(this)}>Отменить</button>
              <button className="btn btn-primary" onClick={this.handleAddPostSubmit.bind(this)}>Добавить</button>
            </div>
          </div>
        </div>
        }



        <button className="btn btn-success" onClick={this.showAddPostModalEvent.bind(this)}>
          <i className="fas fa-plus"></i>
        </button>

        <ul>
          {
            posts.map((post) => {
              return (
                <li key={post._id}>
                  {post.title},
                  {post.author},
                  {post.content}

                  <button className="btn btn-danger mr-2">
                    <i className="fas fa-trash"></i>
                  </button>
                  <button className="btn btn-warning">
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default App;