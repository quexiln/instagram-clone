const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    phoneNoOrGmail: String,
    nameSurname: String,
    username: String,
    password: String,
    biography: String,
    posts: Array,
    stories: Array,
    followers: Array,
    followings: Array,
    savedPosts: Array,
    taggedPosts: Array,
    profilePhoto: { data: Buffer, contentType: String },
  });
  const User = mongoose.model("Users", UserSchema);
  
module.exports = User;