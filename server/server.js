var bodyParser = require('body-parser');
var mongoose = require('./db/db');
var express = require('express');
var cors = require('cors');
var postRoute = require('./route/postRoute.js');
var authRoute = require('./route/authRoute');
var profileRoute = require('./route/profileRoute');
var commentRoute = require('./route/commentRoute');
var path = require('path');
var app = express();

app.use(bodyParser());
app.use(cors());

const uploadDir = path.join(__dirname, "uploads");
app.use(express.static(uploadDir));

app.use('/', postRoute);
app.use('/', authRoute);
app.use('/', profileRoute);
app.use('/', commentRoute);

app.use(function(err, req, res, next) {
  console.log(err);

  const statusCode = err.status || 500;
  const errorResponse = {
    name: err.name,
    message: err.message,
    text: err.toString(),
    statusCode: statusCode
  };

  res.status(statusCode).send(errorResponse);
});

app.listen(3001, function() {
  console.log('Server started on port 3001');
});