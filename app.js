var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var ejs = require('ejs');
var expressValidator = require('express-validator');

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

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    , root        = namespace.shift()
    , formParam   = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

var users = [
  {
    name: "Jimmy",
    email: "jimmy@test.com",
    age: 25
  },
  {
    name: "Leia",
    email: "leia.test.com",
    age:23
  }
];

app.get('/', (req, res) => {
  res.render('index.ejs', {
    title: "Hello World",
    users
  });
  // res.send("hello");
});

app.post('/users/add', (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  };
});

app.listen(3000, () => {
  console.log('Server started on port 3000...');
});
