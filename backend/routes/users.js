var express = require("express");
var multer = require("multer");
const { default: mongoose } = require("mongoose");
var router = express.Router();

mongoose
  .connect("mongodb://localhost:27017/instagram", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch((err) => console.error("MongoDB bağlantı hatası:", err));

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

router.post("/getProfile", async (req, res) => {
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

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      $or: [{ username: username }, { phoneNoOrGmail: username }],
      password: password,
    });
    if (user) {
      res.json(user);
    } else {
      res.status(400).json({ message: "Kullanıcı Bulunamadı" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/getProfileInformations", async (req, res) => {
  try {
    const { input } = req.body;
    let user = await User.findOne({ username: input });

    if (!user) {
      user = await User.findById(input);
    }

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Kullanıcı Bulunamadı" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu Hatası" });
  }
});

const upload = multer();

router.post("/register", upload.single("profilePhoto"), (req, res) => {
  const { phoneNoOrGmail, nameSurname, username, password } = req.body;

  const profilePhoto = {
    data: req.file.buffer,
    contentType: req.file.mimetype,
  };

  User.exists({
    $or: [{ phoneNoOrGmail: phoneNoOrGmail }, { username: username }],
  })
    .then((exists) => {
      if (exists) {
        res.status(400).json({
          message: "Bu kullanıcı adı veya e-posta zaten kullanılıyor.",
        });
      } else {
        const user = new User({
          phoneNoOrGmail: phoneNoOrGmail,
          nameSurname: nameSurname,
          username: username,
          password: password,
          profilePhoto: profilePhoto,
        });

        user
          .save()
          .then(() => {
            res.json(user);
          })
          .catch((err) => {
            res.status(500).send("Kullanıcı kaydedilemedi.");
          });
      }
    })
    .catch((err) => {
      res.status(500).send("Hata oluştu.");
    });
});
router.post("/registerCheckPhoneNoOrGmail", async (req, res) => {
  try {
    const { phoneNoOrGmail } = req.body;
    const user = await User.findOne({ phoneNoOrGmail: phoneNoOrGmail });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/registerCheckUsername", async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/follow", async (req, res) => {
  try {
    const { followerId, followedUsername } = req.body;
    const follower = await User.findOneAndUpdate(
      { _id: followerId },
      { $addToSet: { followings: followedUsername } },
      {
        upsert: false,
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    const followed = await User.findOneAndUpdate(
      { username: followedUsername },
      { $addToSet: { followers: follower.username } },
      {
        upsert: false,
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    if (follower && followed) {
      return;
    } else {
      res.status(400).json({ message: "Kullanıcı Bulunamadı" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
router.post("/unFollow", async (req, res) => {
  try {
    const { followerId, followedUsername } = req.body;
    const follower = await User.findOneAndUpdate(
      { _id: followerId },
      { $pull: { followings: followedUsername } },
      {
        upsert: false,
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    const followed = await User.findOneAndUpdate(
      { username: followedUsername },
      { $pull: { followers: follower.username } },
      {
        upsert: false,
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    if (follower && followed) {
      return;
    } else {
      res.status(400).json({ message: "Kullanıcı Bulunamadı" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
router.post("/checkFollow", async (req, res) => {
  try {
    const { followerId, followedUsername } = req.body;
    const follower = await User.findById(followerId);
    const followed = await User.findOne({ username: followedUsername });

    if (!follower || !followed) {
      res.status(400).json(false);
    } else if (followerId === followed._id.toString()) {
      res.json(true);
    } else if (followed.followers.includes(follower.username)) {
      res.json(true);
    } else {
      res.status(400).json(false);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/", (req, res) => {
  User.find({})
    .then((users) => {
      console.log(req.body);
      res.json(users);
    })
    .catch((err) => {
      console.error("Kullanıcıları getirme hatası:", err);
      res.status(500).send("Kullanıcıları getirme hatası.");
    });
});

module.exports = router;
