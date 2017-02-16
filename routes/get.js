module.exports = function(app, models) {
  app.post('/get', (req, res) => {
    // console.log(req.user);
    //Return a list of all objects for user

    if (req.body.key) {
      //Get a specific object
      if (req.body.version) {
        //Grab a specific version
        console.log(req.body);
        models.BackupReference.findOne({ key : req.body.key, version: req.body.version, userId: req.user._id }, (err, object) => {
          if (err) {
            console.error(err);
            res.status(500).send();
          }
          if (!object) {
            console.error('No object found.');
            res.status(404).send();
          } else {
            res.send(object);
          }
        });
      } else {
        //Else pull all for key

        models.BackupReference.find({ key: req.body.key, userId: req.user._id }, (err, objects) => {
          if (err) {
            console.error(err);
            res.status(404).send();
          } else if (objects) {
            console.log(objects);
            res.send(objects);
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
      //Return all objects for user here.
      models.BackupReference.find({ userId: req.user._id }, (err, objects) => {
        if (err) {
          console.error(err);
          res.status(404).send();
        } else if (objects) {
          res.send(objects);
        } else {
          res.status(404).send();
        }
      });
    }
  });
};