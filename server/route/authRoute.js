const router = require('express').Router();
const User = require('./../db/model/user');

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
      savedUser: savedUser
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
            user: user
          })
        }
      });
    }
  }).catch(error => {
    console.log(error);
    res.status(500).send('Internal Server Error');
  });
});

module.exports = router;