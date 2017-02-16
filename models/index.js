module.exports = function (mongoose) {
  


  return {
    BackupObject: require('./object')(mongoose),
    BackupReference: require('./ref')(mongoose),
    Key: require('./key')(mongoose),
    User: require('./user')(mongoose),
  }
};