var express = require("express");
var router = express.Router();
var User = require("./user");

router.post("/profile", async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
      res.json({
        phoneNoOrGmail: user.phoneNoOrGmail,
        nameSurname: user.nameSurname,
        username: user.username,
        biography: user.biography,
        posts: user.posts,
        stories: user.stories,
        followers: user.followers,
        followings: user.followings,
        taggedPosts: user.taggedPosts,
        profilePhoto: user.profilePhoto,
      });
    } else {
      res.status(400).json({ message: "Kullanıcı Bulunamadı" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/profileInformations", async (req, res) => {
  try {
    const { input } = req.body;
    let user = await User.findOne({ username: input });

    if (!user) {
      user = await User.findById(input);
    }

    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        nameSurname: user.nameSurname,
        profilePhoto: user.profilePhoto,
        biography: user.biography,
        posts: user.posts,
        followers: user.followers,
        followings: user.followings,
      });
    } else {
      res.status(404).json({ message: "Kullanıcı Bulunamadı" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu Hatası" });
  }
});

module.exports = router;
