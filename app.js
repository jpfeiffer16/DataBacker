const mongoose = require('mongoose');
const passport = require('passport');
// const LocalStrategy = passport.Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;
const bodyParser = require('body-parser');
const fs = require('fs');

require('dotenv').config();

//NOTE: If local set this is the .env file
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

let models = require('./models')(mongoose);

mongoose.connect(MONGO_URI, (err) => {
  if (err) {
    console.error('Unable to connect to DB.');
    console.error(err);
  }
});

const express = require('express');
let app = express();

app.set('view engine', 'handlebars')

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

passport.use('UserAuthentication', new BasicStrategy(models.User.authenticate()));

passport.serializeUser(models.User.serializeUser());
passport.deserializeUser(models.User.deserializeUser());

app.all('*', passport.authenticate('UserAuthentication', { session: true }), (req, res, next) => {
  next();
});

app.get('/', (req, res) => {
  fs.createReadStream('./views/index.html').pipe(res);
});

require('./routes')(app, models);

app.listen(PORT, () => {
  console.log(`Server listening on port ${ PORT }`)
});

// models.User.register(new models.User({ username: 'test' }), 'test', () => {
//   console.log('User registered!');
// });