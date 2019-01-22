var bodyParser = require('body-parser');
var mongoose = require('./db/db');
var express = require('express');
var postRoute = require('./route/postRoute.js');
var app = express();
app.use(bodyParser());
app.use('/', postRoute);

app.listen(3000, function() {
  console.log('Server started on port 3000');
});