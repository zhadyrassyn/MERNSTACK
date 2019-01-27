import React from 'react';
import Header from './Header';
import axios from 'axios';

import './styles/index.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      showDiv: false,
      inputValue: '',
      posts: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(event) {
    console.log('Button clicked', event);
    this.setState({
      showDiv: true,
    });
  }

  componentDidMount() {
    // setInterval(() => {
    //   this.setState({
    //     date: new Date()
    //   })
    // }, 1000);

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

  handleChange(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  handleReport(name) {
    console.log('In App.jsx ', name);
  };

  handleFormClick() {
    console.log(this.state.inputValue);
  }

  render() {
    const text = "Welcome message";
    const now = this.state.date.toLocaleTimeString();

    const showDiv = this.state.showDiv;
    const inputValue = this.state.inputValue;

    const posts = this.state.posts;

    return (
      <div>
        {showDiv &&
          <div>
            Information after button clicked
          </div>
        }
        {now}
        <Header text={text} handleReport={this.handleReport}/>

        <h1>My cool application</h1>

        <button onClick={this.handleClick} type='button'>Click me</button>

        <ul>
          {
            posts.map((post) => {
              return (
                <li key={post.title}>
                  {post.title},
                  {post.author},
                  {post.content}
                </li>
              )
            })
          }

        </ul>

        <form>
          <input value={inputValue} placeholder="First name" type="text" onChange={this.handleChange}/>
          <button type="button" onClick={this.handleFormClick.bind(this)}>
            Submit form
          </button>
        </form>
      </div>
    )
  }
}

export default App;