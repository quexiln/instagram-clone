var express = require("express");
var router = express.Router();
var User = require("./user");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

router.post("/get", async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      res.status(404).json({ message: "Kullanıcı bulunamadı" });
    } else {
      res.json(user.posts);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/getWithId", async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findOne({ "posts.id": id });

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    const post = user.posts.find((p) => p.id === id);

    if (!post) {
      return res
        .status(404)
        .json({ message: "Belirtilen id ile post bulunamadı" });
    }
    res.json({
      ...post,
      username: user.username,
      profilePhoto: user.profilePhoto,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const upload = multer();

router.post("/create", upload.single("post"), async (req, res) => {
  try {
    const { id, captionText, locationText, interactionVisibility, commenting } =
      req.body;

    const uniqueId = uuidv4();

    const post = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      {
        $addToSet: {
          posts: {
            id: uniqueId,
            captionText,
            locationText,
            interactionVisibility,
            commenting,
            post,
          },
        },
      },
      { new: true } // Bu, güncellenmiş belgeyi döndürmek için kullanılır
    );

    if (updatedUser) {
      res
        .status(200)
        .json({ message: "Post created successfully", user: updatedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
