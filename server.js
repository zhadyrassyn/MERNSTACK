const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test',
  {useNewUrlParser: true}, function(error) {
    if (error) {
      console.log('Cannot connect to mongodb');
      process.exit(0);
    } else {
      console.log('Mongodb started on port 27017');
    }
  });

var express = require('express');
var app = express();

app.get('/', function(request, response) {
  console.log(request);
  console.log(response);
  response.send('Hello, world');
});

app.listen(3000, function() {
  console.log('Server started on port 3000');
});