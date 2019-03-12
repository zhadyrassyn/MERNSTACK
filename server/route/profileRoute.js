const router = require('express').Router();
const Post = require('./../db/model/post');
const User = require('./../db/model/user');
const passport = require('./../service/passport');

const multer = require('multer');
const path = require('path');
const uploadDir = path.join(__dirname, "../uploads");
const upload = multer({ dest: uploadDir });
const base64Img = require('base64-img');

const requireSignIn = passport.authenticate('jwt', { session: false });

router.get('/api/profiles/posts', requireSignIn, async (req, res, next) => {
  const user = req.user;

  try {
    const posts = await Post.find({ author: user._id });

    res.send({
      posts: posts
    });
  } catch(e) {
    console.log(e);
    res.status(500).send(e);
  }

});

// СОЗДАНИЕ НОВОГО ПОСТА
router.post('/api/profiles/posts', requireSignIn, upload.single('file'), function(request, response) {
  var title = request.body.title;
  var author = request.user._id;
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

router.delete('/api/profiles/posts/:postId', requireSignIn, function(request, response) {
  const postId = request.params.postId;

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

router.put('/api/profiles/posts/:postId', requireSignIn, upload.single('file'), function(request, response) {
  var postId = request.params.postId;

  var title = request.body.title;
  var content = request.body.content;
  var author = request.user._id;

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

router.get('/api/profile', requireSignIn, async (req, res, next) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;