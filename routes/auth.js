const bcrypt = require("bcryptjs/dist/bcrypt");
const express = require("express");
const User = require("../models/user");
const authRouter = express.Router();

//Sign up
authRouter.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with same email already exitsts!" });
    }
    const hashedPassword = await bcrypt.hash(password, 8);

    let user = new User({
      name,
      email,
      password: hashedPassword,
    });
    user = await user.save();
    res.json(user);
    console.log(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//sign up
authRouter.post("/api/signin", async (req, res) =>{
    try {
        const {email, password } = req.body
        const existingUser = await User.findOne({ email });
        if(!user){
            return res
            .status(400)
            .json({ msg: "User with same email already exitsts!" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ msg: "Invalid credentials!" });
            }
            const token = jwt.sign({id: user._id},"passwordKey");
            res.json({token, ...user._doc});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
})

module.exports = authRouter;
