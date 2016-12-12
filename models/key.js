module.exports = function(mongoose) {
  let Key = mongoose.model('Key', 
  {
    name: String
  });

  return Key;
}