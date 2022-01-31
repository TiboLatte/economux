const router = require("express").Router();
const userModel = require("../model/user.model");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  //Validate data
  const { error } = registerValidation(req.body);
  if (error != undefined) {
    console.log(error)
    return res.status(400);

  }
  //Check if user is on db
  const emailExists = await userModel.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send("Email already exists");
  }

  //Hash the pwd
  const salt = await bcrypt.genSalt(10);
  const hashPwd = await bcrypt.hash(req.body.password, salt);

  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: hashPwd,
  });
  user
    .save()
    .then(() => res.send(user))
    .catch((err) => res.status(400).json("ERROR " + err));
});
router.get("/get", (req, res) => {
  userModel
    .find()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("ERROR " + err));
});

//LOGIN
router.post("/login", async (req, res) => {
  //Validate data
  const { error } = loginValidation(req.body);
  if (error != undefined) {
    return res.status(400);
  }
  //Check if user is on db
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Email or password is wrong");
  }

  //Check if password is correct
  const isPasswordCorrect = await bcrypt.compare(
    String(req.body.password),
    String(user.password)
  );
  if (!isPasswordCorrect)
    return res.status(400).send("Email or password is wrong");

  //Create and assign a token to be recognized
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
  
});

module.exports = router;
