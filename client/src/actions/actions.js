const posts = [
  {
    title: 'asdf',
    content: 'gggg',
    author: 'sdfsd'
  },

  {
    title: 'aaa',
    content: 'bbb',
    author: 'ccc'
  }
];

export function getPosts() {
  return {
    type: 'GET_POSTS',
    data: posts
  }
}

export function addPost(newPost) {
  return {
    type: 'ADD_POST',
    data: newPost
  }
}