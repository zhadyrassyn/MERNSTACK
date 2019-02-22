const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('./../db/model/user');

const passport = require('./../service/passport');

const generateToken = (user) => {
  return jwt.sign({
    id: user._id,
  }, 'counter-strike', { expiresIn: '2h' });
};

router.post('/api/auth/sign-up', (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  const user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password
  });

  user.save().then(savedUser => {
    res.status(201).send({
      token: generateToken(savedUser)
    });
  }).catch(error => {
    console.log(error);
    res.status(500).send('Internal Server Error');
  })
});

router.post('/api/auth/sign-in', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then(user => {
    if(user == null) {
      res.status(401).send('Email or password is wrong');
    } else {

      user.comparePasswords(password, function(error, result) {
        if(error || result == false) {
          res.status(401).send('Email or password is wrong');
        } else {
          res.send({
            token: generateToken(user)
          });
        }
      });
    }
  }).catch(error => {
    console.log(error);
    res.status(500).send('Internal Server Error');
  });
});

router.get('/api/secret', passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
  res.send({
    data: 'Secret data',
    user: req.user
  });
});

//asdfkljasdljg;klqwrhowrhla;sdfjro;ghjaklsdjflkajdsf - key

module.exports = router;