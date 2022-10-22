const express = require("express");

const {
  periodicPaymentsSchema,
  PeriodicPayments,
  validatePeriodicPayments,
} = require("../models/periodicpaymentsModel");

const { HouseHold } = require("../models/householdsModel");
const { ExpenseType } = require("../models/expenseTypeModel");
const { HouseHoldExpense } = require("../models/houseHoldExpensesModel");

const auth = require("../middlewears/auth.js");
const validateObjId = require("../middlewears/validateobjectId");
const admin = require("../middlewears/admin");

const router = express.Router();

const app = express();
app.use(express.json());

router.get("/", async (req, res) => {
  console.log("in get");
  const periodicPayments = await PeriodicPayments.find();
  if (!periodicPayments)
    return res.status(404).send("PeriodicPayments are not found");
  res.send(periodicPayments);
});

router.get("/:id", auth, async (req, res) => {
  const periodicPayments = await PeriodicPayments.findById(req.params.id);

  if (!periodicPayments)
    return res.status(404).send("periodicPayments are not found");
  res.send(periodicPayments);
});

router.post("/", auth, async (req, res) => {
  const { error } = validatePeriodicPayments(req.body);
  if (error) return res.status(400).send(error.details[0], message);

  const houseHold = await HouseHold.findById(req.body.householdId);
  if (!houseHold) return res.status(404).send("HouseHolds not found");

  const expensetype = await ExpenseType.findById(req.body.expensetypeId);
  if (!expensetype) return res.status(404).send("expensetype not found");

  const paymentDetailsArr = req.body.paymentDetails.map((val) => val);

  const periodicPayments = new PeriodicPayments({
    householdId: {
      _id: houseHold._id,
      name: houseHold.name,
    },
    expensetypeId: {
      _id: expensetype._id,
      name: expensetype.name,
    },
    paymentDetails: paymentDetailsArr,
    description: req.body.description,
    // paidThrough: req.body.paidThrough,
    // paidBy: req.body.paidBy,
    frequency: req.body.frequency,
    // amount: req.body.amount,
    dueDate: req.body.dueDate,
  });

  await periodicPayments.save();
  res.send(periodicPayments);
});

module.exports = router;
