const express = require("express");
const router = express.Router();

const {
  validateHousehold,
  HouseHold,
  houseHoldSchema,
} = require("../models/householdsModel.js");
const { User, userSchema, validateUser }= require("../models/usersModel");
const {
    validatehouseHoldmembersSchema,
    Householdmember,
    householdmembersSchemaSchema,
  }=require("../models/householdmembersModel.js");

const app = express();
app.use(express.json());

router.get("/", async (req, res) => {
  const houseHolds = await HouseHold.find(req.body.householdId);
  if (!houseHolds) return res.status(404).send("HouseHolds not found");

  const user = await User.find(req.body.userId);
  if (!user) return res.status(404).send("user not found");

const householdmember=new Householdmember({
userName:user.firstName,

householsName:

})



  res.send(householdmember);
});

router.get("/:id", async (req, res) => {
  const houseHolds = await HouseHold.findById(req.params.id);
  if (!houseHolds) return res.status(404).send("HouseHolds not found");
  res.send(houseHolds);
});

router.post("/", async (req, res) => {
  const houseHold = new HouseHold({
    name:
  })
});

module.exports = router;