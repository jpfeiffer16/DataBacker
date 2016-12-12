
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config();
// const LocalStrategy = passport.Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;

const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const bodyParser = require('body-parser');

//NOTE: If local set this is the .env file
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, (err) => {
  if (err) {
    console.error('Unable to connect to DB.');
    console.error(err);
  }
});

let models = require('./models')(mongoose);


const express = require('express');
let app = express();

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

passport.use('UserAuthentication', new BasicStrategy(models.User.authenticate()));
// app.use(passport.authenticate('UserAuthentication', { session: false }));

passport.serializeUser(models.User.serializeUser());
passport.deserializeUser(models.User.deserializeUser());

app.all('*', passport.authenticate('UserAuthentication', { session: false }), (req, res, next) => {
  next();
});

app.post('/push', (req, res) => {
  if (!req.body.content) res.staus(500).send('No content!');
  if (!req.body.key) res.staus(500).send('No key!');

  
  
  res.send('Success!');
});

app.get('/get', (req, res) => {
  
  res.send('Hello World! You are authenticated.');
});

app.get('/ensureUser', (req, res) => {
  // res.send('Hello World!')
  //TODO: Create user here if necessary
});

// passport.use(new LocalStrategy(models.User.authenticate()));

app.listen(PORT, () => {
  console.log(`Server listening on port ${ PORT }`)
});

// models.User.register(new models.User({ username: 'jpfeiffer' }), 'test', () => {
//   console.log('User registered!');
// });