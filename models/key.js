module.exports = function(mongoose) {
  let Key = mongoose.model('Key', 
  {
    name: String,
    version: String
  });

  return Key;
}