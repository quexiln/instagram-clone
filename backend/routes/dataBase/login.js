var express = require("express");
var router = express.Router();
var User = require("./user");

router.post("/", async (req, res) => {
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

module.exports = router;