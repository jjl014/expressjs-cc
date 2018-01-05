var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var ejs = require('ejs');

var app = express();

// var logger = (req, res, next) => {
//   console.log('Logging...');
//   next();
// };
//
// app.use(logger);

// View Engine
app.set('view engine', ejs);
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index.ejs', {
    title: "Hello World"
  });
  // res.send("hello");
});

app.listen(3000, () => {
  console.log('Server started on port 3000...');
});
