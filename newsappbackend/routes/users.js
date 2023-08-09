const express=require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')


const router = express.Router();
const UserModel = require('../models/users'); 

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    return res.json({ message: "email already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ email, password: hashedPassword });
  await newUser.save();
  res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.json({ message: "email or password is incorrect" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ message: "email or password is incorrect" });
  }
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

module.exports = router;

