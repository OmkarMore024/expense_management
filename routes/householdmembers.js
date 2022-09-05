const express = require("express");
const router = express.Router();

const {
  validateHousehold,
  HouseHold,
  houseHoldSchema,
} = require("../models/householdsModel.js");
const { User, userSchema, validateUser } = require("../models/usersModel");
const {
  validatehouseHoldmembers,
  Householdmember,
  householdmembersSchema,
} = require("../models/householdmembersModel.js");

const app = express();
app.use(express.json());

router.get("/", async (req, res) => {
  const householdmembers = await Householdmember.find();
  if (!householdmembers)
    return res.status(404).send("HouseHoldsmember not found");

  res.send(householdmembers);
});

router.get("/:id", async (req, res) => {
  const householdmember = await Householdmember.findById(req.params.id);
  if (!householdmember)
    return res.status(404).send("HouseHoldsmember not found");

  res.send(householdmember);
});

router.post("/", async (req, res) => {
  const { error } = validatehouseHoldmembers(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const houseHolds = await HouseHold.findById(req.body.householdId);
  if (!houseHolds) return res.status(404).send("HouseHolds not found");

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(404).send("user not found");

  // return res.send([houseHolds, user]);
  const householdmember = new Householdmember({
    houseHold: {
      _id: houseHolds._id,
      name: houseHolds.name,
    },
    user: {
      _id: user._id,
      userName: user.firstName +" "+user.lastName,
    },
  });
  await householdmember.save();
  res.send(householdmember);
});

// router.put("/:id", async (req, res) => {
//   const householdmember = await Householdmember.findById(req.params.id);
//   if (!householdmember) return res.status(404).send("Given id is not found");

//   householdmember=new 
// });

router.delete("/:id", async (req, res) => {
  const householdmember = await Householdmember.findByIdAndDelete(
    req.params.id
  );

  if (!householdmember)
    return res.status(404).send("The given householdmembers not found");
  res.send(householdmember);
});

module.exports = router;
