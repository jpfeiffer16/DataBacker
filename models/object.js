module.exports = function(mongoose) {
  let BackupObject = mongoose.model('Object', 
  {
    fileName: String,
    key: String,
    content: Buffer
  });

  return BackupObject;
};