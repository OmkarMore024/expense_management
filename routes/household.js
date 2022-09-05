const express = require("express");
const router = express.Router();

const {
  validateHousehold,
  HouseHold,
  houseHoldSchema,
} = require("../models/householdsModel.js");
const { User } = require("../models/usersModel");

const app = express();
app.use(express.json());

router.get("/", async (req, res) => {
  const houseHolds = await HouseHold.find();
  if (!houseHolds) return res.status(404).send("HouseHolds not found");
  res.send(houseHolds);
});

router.get("/:id", async (req, res) => {
  const houseHolds = await HouseHold.findById(req.params.id);
  if (!houseHolds) return res.status(404).send("HouseHolds not found");
  res.send(houseHolds);
});

router.post("/", async (req, res) => {
  const { error } = validateHousehold(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const houseHold = new HouseHold({
      name: req.body.name,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      area: req.body.area,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
    });
    await houseHold.save();
    res.status(200).send(houseHold);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.put("/:id",async (req,res)=>{
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const houseHold = await HouseHold.findByIdAndUpdate(
    req.params.id,
    { $set: { name: req.body.name } },
    { new: true, runValidators: true }
  );
  if (!houseHold) return res.status(404).send("given id is not found");

  res.send(houseHold);
})
router.delete("/:id",async (req,res)=>{
    const houseHold=await HouseHold.findByIdAndDelete(req.params.id);
    if(!houseHold) return res.status(404).send("The given HouseHolds not found");
    res.send(houseHold);
});

module.exports = router;
