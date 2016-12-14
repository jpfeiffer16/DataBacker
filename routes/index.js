const fs = require('fs');
const path = require('path');

module.exports = function(app, models) {
  fs.readdir(__dirname, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      if (file != 'index.js') {
        require(path.join(__dirname, file))(app, models);
      }
    });
  });
};