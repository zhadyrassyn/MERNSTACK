var express = require('express');
var router = express.Router();

var multer = require('multer');
var path = require('path');

var uploadDir = path.join(__dirname, "../uploads");
var upload = multer({ dest: uploadDir });

var base64Img = require('base64-img');

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
router.post('/api/posts', upload.single('file'), function(request, response) {
  var title = request.body.title;
  var author = request.body.author;
  var content = request.body.content;

  var newPostData = {
    title: title,
    author: author,
    content: content,
  };

  var filePath = '';
  try {
    filePath = request.file.path;
  } catch(e) {
    console.log('File not found');
  }

  // var filePath = request.file && request.file.path || "";

  base64Img.base64(filePath, function(err, data) {
    if (err)
      console.log(err);
    else
      newPostData.image = data;

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

router.put('/api/posts/:postId', upload.single('file'), function(request, response) {
  var postId = request.params.postId;

  var title = request.body.title;
  var content = request.body.content;
  var author = request.body.author;

  var filePath = '';
  try {
    filePath = request.file.path;
  } catch(e) {
    console.log('File not found');
  }

  const updatePost = {
    title: title,
    author: author,
    content: content
  };

  base64Img.base64(filePath, function(err, data) {
    if (err)
      console.log(err);
    else
      updatePost.image = data;

    Post.findByIdAndUpdate(postId, {$set: updatePost}, {new: true})
      .then(function(updatedPost) {
        response.send({
          updatedPost: updatedPost
        })
      }).catch(function(error) {
      console.log(error);
      response.status(500).send(error);
    });

  });
});

module.exports = router;