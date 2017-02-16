module.exports = function(mongoose) {
  let BackupObject = mongoose.model('Object', 
  {
    content: Buffer,
  });

  return BackupObject;
};