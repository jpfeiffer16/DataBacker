module.exports = function(mongoose) {
  let BackupReference = mongoose.model('Reference', 
  {
    fileName: String,
    key: String,
    contentId: mongoose.Schema.ObjectId,
    version: String,
    userId: mongoose.Schema.ObjectId
  });

  return BackupReference;
};