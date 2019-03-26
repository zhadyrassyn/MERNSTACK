const mongoose = require('./../db');

const Comment = mongoose.model('comment', {
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  }
});

module.exports = Comment;