var express = require("express");
const { default: mongoose } = require("mongoose");
var router = express.Router();
var User = require("./dataBase/user");

mongoose
  .connect("mongodb://localhost:27017/instagram", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch((err) => console.error("MongoDB bağlantı hatası:", err));


router.use("/profile",require("./dataBase/profile"));

router.use("/login",require("./dataBase/login"));

router.use("/register", require("./dataBase/register"));

router.use("/follow", require("./dataBase/follow"));

router.use("/posts", require("./dataBase/posts"));


router.get("/", (req, res) => {
  User.find({})
    .then((users) => {
      console.log(req.body);
      res.json(users);
    })
    .catch((err) => {
      console.error("Kullanıcıları getirme hatası:", err);
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
