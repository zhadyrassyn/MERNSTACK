var express = require('express');
var router = express.Router();

var Post = require('./../db/model/post.js');
router.get('/api/posts', function(request, response) {
  Post.find().then(function(posts) {
    response.status(200).send({
      posts: posts
    });
  }).catch(function(error) {
    console.log(error);
    response.status(500).send(error);
  })
});

// {
//   title: 'Good day',
//     author: 'Jacob M.',
//   content: 'Today is perfect day'
// }

// СОЗДАНИЕ НОВОГО ПОСТА
router.post('/api/posts', function(request, response) {
  var title = request.body.title;
  var author = request.body.author;
  var content = request.body.content;

  var newPostData = {
    title: title,
    author: author,
    content: content
  };

  var newPost = new Post(newPostData);
  newPost.save().then(function(savedPost) {
    response.send({
      savedPost: savedPost
    })
  }).catch(function(error) {
    console.log(error);
    res.status(403).send(error);
  })
});

//localhsot:3000/api/posts/1234
router.delete('/api/posts/:postId', function(request, response) {
  var postId = request.params.postId;

  Post.findByIdAndDelete(postId).then((deletedPost) => {
    if (deletedPost == null) {
      response.status(400).send({message: 'Post with id does not exist'})
    } else {
      response.status(200).send({
        deletedPost: deletedPost
      })
    }
  }).catch((error) => {
    console.log(error);
    response.status(500).send(error);
  })
});

router.put('/api/posts/:postId', function(request, response) {
  var postId = request.params.postId;

  var title = request.body.title;
  var content = request.body.content;
  var author = request.body.author;

  // 1 method. Each field must not be null
  // if (postId == null) {
  //   response.status(400).send({ message: 'postId param is null'});
  // } else if (title == null) {
  //   response.status(400).send({ message: 'title param is null'});
  // }

  // 2 method. Update fields that are not null
  // var updateData = {};
  // if (title != null) {
  //   updateData.title = title;
  // }

  // 3 method validation.
  if (postId == null || title == null || content == null || author == null) {
    response.status(400).send({ message: 'All fields must be filled '});
  }

  Post.findByIdAndUpdate(postId, {$set: {
    title: title,
    content: content,
    author: author
  }}, {new: true})
    .then(function(updatedPost) {
      response.send({
        updatedPost: updatedPost
      })
    }).catch(function(error) {
    console.log(error);
    response.status(500).send(error);
  });


});

module.exports = router;