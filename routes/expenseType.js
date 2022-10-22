const express = require("express");
const { model } = require("mongoose");
const {
  ExpenseType,
  validateExpenseType,
} = require("../models/expenseTypeModel");
const router = express.Router();

const auth = require("../middlewears/auth.js");
const validateObjId = require("../middlewears/validateobjectId");
const admin = require("../middlewears/admin");

router.get("/", async (req, res) => {
  const expenseTypes = await ExpenseType.find({});
  res.status(200).send(expenseTypes);
});

router.get("/:id", validateObjId, async (req, res) => {
  const expenseType = await ExpenseType.findById(req.params.id);
  res.status(200).send(expenseType);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateExpenseType(req.body);

  if (error) return res.status(404).send(error.details[0].message);

  const expenseType = new ExpenseType({
    name: req.body.name,
  });
  await expenseType.save();
  res.status(200).send(expenseType);
});

router.put("/:id", auth, admin, validateObjId, async (req, res) => {
  let expenseType = await ExpenseType.findById(req.params.id);
  if (!expenseType)
    return res
      .status(404)
      .send("Expense Type with given id could not be found!");

  expenseType = await ExpenseType.findByIdAndUpdate(
    { _id: expenseType._id },
    { $set: { name: req.body.name } },
    { new: true, runValidators: true }
  );
  if (!expenseType)
    return res.status(404).send("Could not update the given Expense Type");
  res.status(200).send(expenseType);
});

router.delete("/:id", auth, admin, validateObjId, async (req, res) => {
  const expenseType = await ExpenseType.findById(req.params.id);
  if (!expenseType)
    return res
      .status(404)
      .send("Expense Type with given id could not be found!");
  const deletedExpenseType = await ExpenseType.findByIdAndDelete({
    _id: expenseType._id,
  });

  if (!deletedExpenseType)
    return res
      .status(404)
      .send("Could not delete the given Expense Type" + deletedExpenseType);
  res.status(200).send(deletedExpenseType);
});

module.exports = router;
