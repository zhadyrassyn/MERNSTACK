var mongoose = require('./../db.js');

var Post = mongoose.model('post', {
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: String,
  content: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: String,
    default: new Date()
  },
  image: String
});

module.exports = Post;