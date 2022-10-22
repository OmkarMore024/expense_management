const Joi = require("joi");
const mongoose = require("mongoose");


const expenseTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "firstName should be atleast 5 characters long"],
    maxLength: [50, "firstName should be atmost 50 characters long"],
    required: true,
  },
});

const ExpenseType = mongoose.model("expensetype", expenseTypeSchema);

function validateExpenseType(expenseType) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
  });

  return schema.validate(expenseType);
}

module.exports = { ExpenseType, expenseTypeSchema, validateExpenseType };
