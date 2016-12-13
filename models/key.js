module.exports = function(mongoose) {
  let Key = mongoose.model('Key', 
  {
    name: String,
    version: String,
    userId: mongoose.Schema.ObjectId
  });

  return Key;
}