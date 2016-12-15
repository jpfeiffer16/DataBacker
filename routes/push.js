const semver = require('semver');

module.exports = function(app, models) {
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
              res.send('Success!\n');
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
        res.send('Success!\n');
      }
    });
  });
};