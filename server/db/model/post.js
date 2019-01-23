var mongoose = require('./../db.js');

var Post = mongoose.model('post', {
  author: String,
  title: String,
  content: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: String,
    default: new Date()
  }
});

module.exports = Post;