const router = require("express").Router();
const verify = require("./verifyToken");
const userModel = require("../model/user.model");

router.get("/", verify, async (req, res) => {
  const user = await userModel.findOne({_id: req.user});
  res.send("Bienvenue utilisateur " + user.name)
});

module.exports = router;
