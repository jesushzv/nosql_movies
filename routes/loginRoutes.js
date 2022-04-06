const router = require("express").Router();
const User = require("../models/userModel");
const generateToken = require("../token/genToken");
router.post("/login", async (req, res) => {
  if (req.session.user) {
    res.send({
        message: "You are already logged in",
        token: req.session.user
    });
  } else {
    const user = await User.findOne({ username: req.body.username });
    if (user !== null) {
      if (user.password === req.body.password) {
        const userToken = generateToken({
          username: user.username,
          password: user.password,
        });
        req.session.user = userToken;
        res.send({message: "Logged in" ,token: userToken });
      } else {
        res.status(400).send("Wrong password");
      }
    } else {
      res.status(400).send("User does not exist");
    }
  }
});

router.get("/logout", (req, res) => {
  if (!req.session.user) {
    res.send("You are not logged in");
  } else {
    req.session.destroy();
    res.send("Logged out");
  }
});

module.exports = router;
