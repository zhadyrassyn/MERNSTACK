import {
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  SAVE_POSTS_SUCCESS,
  SAVE_POSTS_ERROR,
} from "./../types/types";
import axios from 'axios';


export const getPosts = () => (dispatch) => {
  axios.get('http://localhost:3001/api/posts')
    .then((response) => {
      dispatch({
        type: GET_POSTS_SUCCESS,
        data: response.data.posts
      });
    }).catch((error) => {
      console.log(error);
      dispatch({
        type: GET_POSTS_ERROR,
        message: error.response.message || 'INTERNAL SERVER ERROR'
      });
  })
};

export const savePost = (addAuthor, addTitle, addContent, changeState) => (dispatch) => {
  axios.post('http://localhost:3001/api/posts', {
      author: addAuthor,
      title: addTitle,
      content: addContent
    }).then((success) => {
      const savedPost = success.data.savedPost;

      dispatch({
        type: SAVE_POSTS_SUCCESS,
        data: savedPost
      });

      changeState()
    }).catch((error) => {
      console.log(error);
      dispatch({
        type: SAVE_POSTS_ERROR,
        message: error.response.message || 'INTERNAL SERVER ERROR'
      })
    });
};

// export function getPosts() {
//   return function(dispatch) {
//
//   }
// }

export function addPost(newPost) {
  return {
    type: 'ADD_POST',
    data: newPost
  }
}