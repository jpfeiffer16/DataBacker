const passportLocalMongoose = require('passport-local-mongoose');

module.exports = function(mongoose) {
  let UserSchema =  new mongoose.Schema({});
  UserSchema.plugin(passportLocalMongoose);
  let User = mongoose.model('User', UserSchema);

  

  return User;
};