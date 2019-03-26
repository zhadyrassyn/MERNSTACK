const router = require('express').Router();

const User = require('./../db/model/user');
const Post = require('./../db/model/post');
const Comment = require('./../db/model/comment');

const passport = require('./../service/passport');
const requireSignIn = passport.authenticate('jwt', { session: false });

router.post('/api/posts/:postId/comments',
  requireSignIn,
  async (req, res, next) => {
  const text = req.body.text;
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);

    const newComment = new Comment({
      text: text,
      user: req.user._id,
      post: post._id
    });

    const savedComment = await newComment.save();

    post.comments.push(savedComment._id);

    const updatedPost = await post.save();

    res.send(savedComment);

  } catch(err) {
    next(err);
  }
});

router.delete('/api/posts/:postId/comments/:commentId',
  requireSignIn,
  async (req, res, next) => {

  const postId = req.params.postId;
  const commentId = req.params.commentId;

  try {
    const post = await Post.findById(postId);
    // ['123', '345', '890']  X '345'
    // ['123', '890']
    post.comments = post.comments.filter(comment => comment != commentId);

    const updatedPost = await post.save();

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    res.send(deletedComment);

  } catch(err) {
    next(err);
  }

});



module.exports = router;