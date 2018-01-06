const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const expressValidator = require('express-validator');
const mongojs = require('mongojs');
const db = mongojs('expresspractice', ['users']);

const app = express();

// const logger = (req, res, next) => {
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

// Global Vars
app.use((req, res, next) => {
  res.locals.errors = null;
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    const namespace = param.split('.')
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

app.get('/', (req, res) => {
  db.users.find((err, docs) => {
    res.render('index.ejs', {
      title: "Users",
      users: docs
    });
  });
});

app.post('/users/add', (req, res) => {
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('age', 'Age is required').notEmpty();

  let errors = req.validationErrors();

  if(errors) {
    db.users.find((err,docs) => {
      res.render('index.ejs', {
        title: 'Users',
        users: docs,
        errors
      });
    });
  } else {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    };
    db.users.insert(newUser, (err, result) => {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000...');
});
