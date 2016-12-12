module.exports = function (mongoose) {
  


  return {
    BackupObject: require('./object')(mongoose),
    Key: require('./key')(mongoose),
    User: require('./user')(mongoose),
  }
};