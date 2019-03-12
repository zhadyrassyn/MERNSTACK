import {
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  SAVE_POSTS_SUCCESS,
  SAVE_POSTS_ERROR,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  FETCH_POST_SUCCESS,
  FETCH_POST_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_SUCCESS,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR
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

export const savePost = (addAuthor, addTitle, addContent, saveImage, changeState) => (dispatch) => {
  const fd = new FormData();
  fd.append('author', addAuthor);
  fd.append('title', addTitle);
  fd.append('content', addContent);
  fd.append('file', saveImage);

  axios.post('http://localhost:3001/api/posts', fd).then((success) => {
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

export const editPost = (id, newPost, changeState) => (dispatch) => {
  const fd = new FormData();
  fd.append('author', newPost.author);
  fd.append('title', newPost.title);
  fd.append('content', newPost.content);
  fd.append('file', newPost.file);

  axios.put('http://localhost:3001/api/posts/' + id, fd)
    .then((success) => {
      const updatedPost = success.data.updatedPost;
      dispatch({
        type: EDIT_POST_SUCCESS,
        data: updatedPost,
      });

      changeState();
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: EDIT_POST_ERROR,
        error: error.message || "ERROR HAPPENED"
      });
    });
};

export const deletePost = (id) => (dispatch) => {
  axios.delete('http://localhost:3001/api/posts/' + id)
    .then((success) => {
      dispatch({
        type: DELETE_POST_SUCCESS,
        data: id,
      });

    }).catch((error) => {
    console.log(error);
    dispatch({
      type: DELETE_POST_ERROR,
      error: error.message || "ERROR HAPPENED"
    });
  });
};

export const getPost = (id) => (dispatch) => {
  axios.get('http://localhost:3001/api/posts/' + id)
    .then((success) => {
      console.log(success);
      dispatch({
        type: FETCH_POST_SUCCESS,
        data: success.data.post
      })
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: FETCH_POST_ERROR
      })
    });
};

export const signin = (email, password, successCallback, errorCallback) => (dispatch) => {
  axios.post('http://localhost:3001/api/auth/sign-in', {
    email: email,
    password: password
  }).then((success) => {
    const token = success.data.token;
    localStorage.setItem('token', token);
    // localStorage.getItem('token');

    dispatch({
      type: SIGN_IN_SUCCESS,
      data: token
    });

    successCallback();

  }).catch((error) => {
    // console.log(error.response);
    dispatch({
      type: SIGN_IN_ERROR
    });

    if (error.response.status == 401) {
      errorCallback(error.response.data);
    } else {
      errorCallback("Internal server error");
    }
  })
};

export const signOut = (successCallback) => {
  localStorage.removeItem('token');
  successCallback();

  return {
    type: SIGN_OUT_SUCCESS
  }
};

export const fetchUser = () => (dispatch) => {
  axios.get('http://localhost:3001/api/profile', {
    headers: {
      "Authorization" : "Bearer " + localStorage.getItem('token')
    }
  }).then(response => {
    const user = response.data;
    dispatch({
      type: FETCH_USER_SUCCESS,
      data: user
    })
  }).catch(error => {
    console.log(error);
    dispatch({
      type: FETCH_USER_ERROR
    })
  });
};