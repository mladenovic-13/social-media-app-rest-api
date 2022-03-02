const router = require("express").Router();
const User = require("../models/User");

// register
router.get("/register", async (req, res) => {
  const user = await new User({
    username: "mladenovic13",
    email: "nikolanik999@gmail.com",
    password: "1312",
  });

  await user.save();
  res.send("ok");
});

module.exports = router;
