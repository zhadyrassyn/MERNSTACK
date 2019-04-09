import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  SAVE_USER_POST_SUCCESS,
  SAVE_USER_POST_ERROR,
  EDIT_USER_POST_SUCCESS,
  EDIT_USER_POST_ERROR,
  DELETE_USER_POST_SUCCESS,
  DELETE_USER_POST_ERROR,
  FETCH_POST_SUCCESS,
  FETCH_POST_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_SUCCESS,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_USER_POSTS_SUCCESS,
  FETCH_USER_POSTS_ERROR,
  UPDATE_USER_AVATAR_SUCCESS,
  UPDATE_USER_AVATAR_ERROR,
  SAVE_COMMENT_SUCCESS,
  SAVE_COMMENT_ERROR,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  CHANGE_SEARCH_PARAMS_SUCCESS
} from "./../types/types";
import axios from 'axios';

const getHeaders = () => {
  return {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  };
};

export const fetchPosts = (perPage, currentPage, searchText, successCallback) => (dispatch, getState) => {

  axios(`http://localhost:3001/api/posts?perPage=${perPage}&currentPage=${currentPage}&searchText=${searchText || ""}`)
      .then((success) => {
        dispatch({
          type: FETCH_POSTS_SUCCESS,
          data: success.data.posts,
          total: success.data.total,
        });

        if(successCallback) {
          successCallback();
        }

      })
      .catch(function(error) {
        console.log(error);
        dispatch({
          type: FETCH_POSTS_ERROR,
          error: error.message || "ERROR HAPPENED"
        })
      })
};


export const fetchPost = (id) => (dispatch) => {
  axios('http://localhost:3001/api/posts/' + id)
    .then((success) => {
      dispatch({
        type: FETCH_POST_SUCCESS,
        data: success.data.post
      })
    })
    .catch(function(error) {
      dispatch({
        type: FETCH_USER_ERROR,
        error: error.message || "ERROR HAPPENED"
      })
    })
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

export const fetchUserPosts = () => (dispatch) => {
  axios.get('http://localhost:3001/api/profiles/posts', {
    headers: {
      "Authorization" : "Bearer " + localStorage.getItem('token')
    }
  }).then(response => {
    const posts = response.data.posts;
    dispatch({
      type: FETCH_USER_POSTS_SUCCESS,
      data: posts
    });
  }).catch(error=> {
    console.log(error);
    dispatch({
      type: FETCH_USER_POSTS_ERROR
    });
  });
};

export const saveUserPost = (addAuthor, addTitle, addContent, saveImage, changeState) => (dispatch) => {
  const fd = new FormData();
  fd.append('author', addAuthor);
  fd.append('title', addTitle);
  fd.append('content', addContent);
  fd.append('file', saveImage);

  axios.post('http://localhost:3001/api/profiles/posts', fd, {
    headers: {
      "Authorization" : "Bearer " + localStorage.getItem('token')
    }
  }).then((success) => {
    const savedPost = success.data.savedPost;

    dispatch({
      type: SAVE_USER_POST_SUCCESS,
      data: savedPost
    });

    changeState()
  }).catch((error) => {
    console.log(error);
    dispatch({
      type: SAVE_USER_POST_ERROR,
      message: error.response.message || 'INTERNAL SERVER ERROR'
    })
  });
};

export const editUserPost = (id, newPost, changeState) => (dispatch) => {
  const fd = new FormData();
  fd.append('author', newPost.author);
  fd.append('title', newPost.title);
  fd.append('content', newPost.content);
  fd.append('file', newPost.file);

  axios.put('http://localhost:3001/api/profiles/posts/' + id, fd, {
    headers: {
      "Authorization" : "Bearer " + localStorage.getItem('token')
    }
  })
    .then((success) => {
      const updatedPost = success.data.updatedPost;
      dispatch({
        type: EDIT_USER_POST_SUCCESS,
        data: updatedPost,
      });

      changeState();
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: EDIT_USER_POST_ERROR,
        error: error.message || "ERROR HAPPENED"
      });
    });
};

export const deleteUserPost = (id) => (dispatch) => {
  axios.delete('http://localhost:3001/api/profiles/posts/' + id, {
    headers: {
      "Authorization" : "Bearer " + localStorage.getItem('token')
    }
  })
    .then((success) => {
      dispatch({
        type: DELETE_USER_POST_SUCCESS,
        data: id,
      });

    }).catch((error) => {
    console.log(error);
    dispatch({
      type: DELETE_USER_POST_ERROR,
      error: error.message || "ERROR HAPPENED"
    });
  });
};

export const updateUserAva = (file) => (dispatch) => {
  const fd = new FormData();
  fd.append("file", file);

  axios.post('http://localhost:3001/api/profile/ava', fd, {
    headers: {
      "Authorization" : "Bearer " + localStorage.getItem('token')
    }
  }).then(success => {
    dispatch({
      type: UPDATE_USER_AVATAR_SUCCESS,
      data: success.data
    });
  }).catch(error => {
    console.log(error);
    dispatch({
      type: UPDATE_USER_AVATAR_ERROR
    })
  })
};


export const saveComment = (postId, commentText, successCallback) => (dispatch) => {
  const data = {
    text: commentText,
  };

  axios.post(`http://localhost:3001/api/posts/${postId}/comments`, data, {
    headers: getHeaders()
  }).then((success) => {
    dispatch({
      type: SAVE_COMMENT_SUCCESS,
      data: success.data
    });

    successCallback();
  }).catch((error) => {
    console.log(error);
    dispatch({
      type: SAVE_COMMENT_ERROR,
      error: error.response && error.response.error || 'INTERNAL_SERVER'
    });
  });
};

export const deleteComment = (postId, commentId) => dispatch => {
  axios.delete(`http://localhost:3001/api/posts/${postId}/comments/${commentId}`, {
    headers: getHeaders()
  }).then((success) => {
    dispatch({
      type: DELETE_COMMENT_SUCCESS,
      data: success.data
    })
  }).catch((error) => {
    console.log(error);
    dispatch({
      type: DELETE_COMMENT_ERROR,
      error: error.response && error.response.error || 'INTERNAL_SERVER'
    });
  });
};

export const signup = (firstName, lastName,
                       email, password,
                       success, fail) => (dispatch) => {

  axios.post('http://localhost:3001/api/auth/sign-up', {
    firstName,
    lastName,
    email,
    password,
  }).then((response) => {
    localStorage.setItem('token', response.data.token);
    dispatch({
      type: SIGNUP_SUCCESS
    });
    success();
  }).catch((error) => {
    console.log(error);
    dispatch({
      type: SIGNUP_ERROR
    });

    console.log('123 ',error.response);
    fail(error.response && error.response.data.error)
  });
};

export const changeSearchParams = (page, searchText) => {
  return {
    type: CHANGE_SEARCH_PARAMS_SUCCESS,
    page: page,
    searchText: searchText
  }
};
