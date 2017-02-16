module.exports = function(mongoose) {
  let BackupReference = mongoose.model('Object', 
  {
    fileName: String,
    key: String,
    contentId: mongoose.Schema.ObjectId,
    version: String,
    userId: mongoose.Schema.ObjectId
  });

  return BackupObject;
};