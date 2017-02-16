module.exports = function(app, models) {
  app.post('/getcontent', (req, res) => {
    
    if (req.body.key) {
      //Get a specific object
      if (req.body.version) {
        //Grab a specific version
        console.log(req.body);
        models.BackupReference.findOne({ key : req.body.key, version: req.body.version, userId: req.user._id }, (err, ref) => {
          if (err) {
            console.error(err);
            res.status(500).send();
          }
          if (!ref) {
            console.error('No object reference found.');
            res.status(404).send();
          } else {
            models.BackupObject.findOne({ _id : ref.contentId }).then((err, object) => {
              if (err) {
                console.error(err);
                res.status(500).send();
              }
              if (!object) {
                console.error('No object found');
                res.status(404).send();
              }

              res.send(object.content);
            });
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
                console.log(object);
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
};