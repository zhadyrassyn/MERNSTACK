var bodyParser = require('body-parser');
var mongoose = require('./db/db');
var express = require('express');
var cors = require('cors');
var postRoute = require('./route/postRoute.js');
var authRoute = require('./route/authRoute');
var profileRoute = require('./route/profileRoute');
var app = express();
app.use(bodyParser());
app.use(cors());

app.use('/', postRoute);
app.use('/', authRoute);
app.use('/', profileRoute);

app.listen(3001, function() {
  console.log('Server started on port 3001');
});