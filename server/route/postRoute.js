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



//localhsot:3000/api/posts/1234




router.get('/api/posts/:postId', (req, res) => {
  const postId = req.params.postId;

  Post.findById(postId).populate({
    path: 'comments',
    select: 'createdAt user text',
    populate: {
      path: 'user',
      select: 'firstName lastName avaPath'
    }
  }).then((post) => {
    res.send({
      post: post
    });
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  })
});

module.exports = router;