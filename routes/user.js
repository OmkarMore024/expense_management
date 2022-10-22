const express = require("express");
const router = express.Router();

const { User, userSchema, validateUser } = require("../models/usersModel");
const loadsh = require("loadsh");
const bcrypt = require("bcrypt");

const auth = require("../middlewears/auth.js");
const validateObjId = require("../middlewears/validateobjectId");
const admin = require("../middlewears/admin");

router.get("/", async (req, res) => {
  const users = await User.find({});
  if (users && users.length === 0)
    return res.status(404).send("users not found");

  res.status(200).send(users);
});
router.get("/:id", validateObjId, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).send("Given id is not found");
  }
  res.status(200).send(user);
});

router.post("/",  async (req, res) => {
  console.log("in post register");
  // console.log(req.body);
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user already exists");

  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      userName: req.body.userName,
      password: req.body.password,
      role: req.body.role,
      isActive: req.body.isActive,
      updatedBy: req.body.updatedBy,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    // await user.save();
    res.send(loadsh.pick(user, ["userName", "email", "role"]));
    await user.save();
    // res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.put("/:id", async (req, res) => {});

router.patch("/:id",admin,async (req,res)=>{
   
})

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user)
    return res
      .status(404)
      .send("Could not delete the given Expense Type" + deletedExpenseType);

  res.send(user);
});

module.exports = router;
