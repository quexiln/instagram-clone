var express = require("express");
var router = express.Router();
var User = require("./user");
const multer = require("multer");


const upload = multer();

router.post("/", upload.single("profilePhoto"), (req, res) => {
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

  router.post("/checkPhoneNoOrGmail", async (req, res) => {
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

  router.post("/checkUsername", async (req, res) => {
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
  module.exports = router;