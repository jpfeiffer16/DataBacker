
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

const semver = require('semver');

app.post('/push', (req, res) => {
  if (!req.body) {
    res.status(500).send('No content!');
    return;
  }
  if (!req.body.content) {
    res.status(500).send('No content!');
    return;
  }
  if (!req.body.key) {
    res.status(500).send('No key!');
    return;
  }

  // models.BackupObject.create(req.body);
  models.Key.findOne({ name: req.body.key, userId: req.user._id }, (err, key) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    if (key) {
      //TODO: Update model here
      console.log('Key exists');
      //TODO: User needs to be able to specify version level change
      let newVersion = semver.inc(key.version, 'major');
      console.log(newVersion);
      key.version = newVersion;

      key.save((err) => {
        if (err) {
          console.error(err);
          res.status(500).send();
        }
        let newObject = req.body;
        newObject.version = newVersion;
        newObject.userId = req.user._id;
        models.BackupObject.create(newObject, (err) => {
          if (err) {
            console.error(err);
            res.status(500).send();
          } else {
            res.send();
          }
        });
      });
    } else {
      let newKey = {
        name: req.body.key,
        version: '1.0.0' ,
        userId: req.user._id
      };
      models.Key.create(newKey);

      let newObject = req.body;
      newObject.version = '1.0.0';
      newObject.userId = req.user._id;
      models.BackupObject.create(req.body);
      res.send('Success!');
    }
  });
});

app.post('/get', (req, res) => {
  console.log(req.user);
  //Return a list of all objects for user
});

app.post('/getcontent', (req, res) => {
  
  if (req.body.key) {
    //Get a specific object
    if (req.body.version) {
      //Grab a specific version
      console.log(req.body);
      models.BackupObject.findOne({ key : req.body.key, version: req.body.version, userId: req.user._id }, (err, object) => {
        if (err) {
          console.error(err);
          res.status(500).send();
        }
        if (!object) {
          console.error('No object found.');
          res.status(404).send();
        } else {
          res.send(object.content);
        }
      });
    } else {
      //Else pull most recent

      models.Key.findOne({ name: req.body.key, userId: req.user._id }, (err, key) => {
        if (err) {
          console.error(err);
          res.status(404).send();
        } else if (key) {
          models.BackupObject.findOne({ key: key.name, version: key.version }, (err, object) => {
            if (err) {
              console.error(err);
              res.status(404).send();
            } else {
              res.send(object.content);
            }
          });
        } else {
          res.status(404).send();
        }
      });

      // models.BackupObject.find({ key: req.body.key }, (err, objects) => {
      //   //Find most recent version here.
      //   if (err) {
      //     console.error(err);
      //     res.status(500).send();
      //   }
      //   if (!objects) {
      //     console.error('No object found.');
      //     res.status(404).send();
      //   } else {
      //     res.send(objects.sort((a, b) => {
      //       if (a.version == b.version) return 0;
      //       return semver.gt(a.version, b.version) ? -1 : 1;
      //     })[0].content);
      //   }
        
      // });
    }
  } else {
    res.status(404).send('Must specify at least a key.');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${ PORT }`)
});

// models.User.register(new models.User({ username: 'test' }), 'test', () => {
//   console.log('User registered!');
// });