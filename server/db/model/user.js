var mongoose = require('./../db');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', function(next) {
  var user = this;

  bcrypt.genSalt(10, function(error, salt) {
    if (error) {
      next(error);
    } else {
      bcrypt.hash(user.password, salt, null, function(error, result) {
        if (error) {
          next(error);
        } else {
          user.password = result;
          next();
        }
      });
    }
  });
});

userSchema.methods.comparePasswords = function(plainPassword, next) {
  var user = this;

  bcrypt.compare(plainPassword, user.password, function(error, result) {
    if (error) {
      next(error);
    } else {
      next(null, result);
    }
  });
};

var User = mongoose.model('user', userSchema);

module.exports = User;