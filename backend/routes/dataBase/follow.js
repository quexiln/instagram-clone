var express = require("express");
var router = express.Router();
var User = require("./user");

router.post("/", async (req, res) => {
  try {
    const { followerInput, followedInput, followingsTab } = req.body;

    const followedInformations = await User.findOne({
      username: followedInput,
    });

    if (!followedInformations) {
      return res
        .status(400)
        .json({ message: "Takip edilecek kullanıcı bulunamadı" });
    }

    const follower = await User.findOneAndUpdate(
      followingsTab ? { username: followerInput } :{ _id: followerInput },
      {
        $addToSet: {
          followings: {
            _id: followedInformations._id,
            username: followedInformations.username,
            nameSurname: followedInformations.nameSurname,
            profilePhoto: `data:${
              followedInformations.profilePhoto.contentType
            };base64,${followedInformations.profilePhoto.data.toString(
              "base64"
            )}`,
          },
        },
      },
      {
        upsert: false,
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    if (!follower) {
      return res.status(400).json({ message: "Takipçi bulunamadı" });
    }

    const followed = await User.findOneAndUpdate(
      { username: followedInput },
      {
        $addToSet: {
          followers: {
            _id: follower._id,
            username: follower.username,
            nameSurname: follower.nameSurname,
            profilePhoto: `data:${
              follower.profilePhoto.contentType
            };base64,${follower.profilePhoto.data.toString("base64")}`,
          },
        },
      },
      {
        upsert: false,
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    if (followed) {
      res.status(200).json({ message: "Takip işlemi başarılı" });
    } else {
      res
        .status(400)
        .json({ message: "Takip edilen kullanıcı güncellenemedi" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/unFollow", async (req, res) => {
  try {
    const { followerInput, followedInput, followingsTab } = req.body;

    console.log(`${followerInput} ${followedInput}`);

    const follower = await User.findOneAndUpdate(
      followingsTab ? { username: followerInput } :{ _id: followerInput },
      { $pull: { followings: { username: followedInput } } },
      {
        upsert: false,
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    const followed = await User.findOneAndUpdate(
      { username: followedInput },
      { $pull: { followers: { username: follower.username } } },
      {
        upsert: false,
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    if (follower && followed) {
      res.status(200).json({ message: "Takipten çıkma işlemi başarılı" });
    } else {
      res.status(400).json({ message: "Kullanıcı bulunamadı" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/checkFollow", async (req, res) => {
  try {
    const { followerInput, followedInput } = req.body;

    const follower = await User.findOne({ _id: followerInput });
    const followed = await User.findOne({ username: followedInput });

    if (!follower || !followed) {
      res.status(400).json({ message: "Takipçi veya takip edilen bulunamadı" });
    } else if (followerInput === followed._id.toString()) {
      res.json(true);
    } else if (
      follower.followings.some((following) =>
        following._id.equals(followed._id)
      )
    ) {
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/getFollowers", async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      res.status(404).json({ message: "Kullanıcı bulunamadı" });
    } else {
      res.json(user.followers);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/getFollowings", async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      res.status(404).json({ message: "Kullanıcı bulunamadı" });
    } else {
      res.json(user.followings);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
