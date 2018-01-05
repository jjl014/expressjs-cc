var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// var logger = (req, res, next) => {
//   console.log('Logging...');
//   next();
// };
//
// app.use(logger);

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server started on port 3000...');
});
