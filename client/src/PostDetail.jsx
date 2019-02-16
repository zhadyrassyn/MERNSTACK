import React from 'react';

class PostDetail extends React.Component {

  componentDidMount() {
    const postId = this.props.match.params.postId;
  }

  render() {
    return (
      <h1>Post detail </h1>
    )
  }
}

export default PostDetail;