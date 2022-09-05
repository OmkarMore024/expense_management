const mongoose = require("mongoose");
const Joi = require("joi");

const { houseHoldSchema } = require("./householdsModel");
const { userSchema } = require("./usersModel");

const Schema = mongoose.Schema;

const householdmembersSchema = new Schema({
  houseHold: {
    type: houseHoldSchema,
    required: true,
  },
  user: {
    type: userSchema,
    required: true,
  },
});

const Householdmember = mongoose.model(
  "householdmember",
  householdmembersSchema
);

function validatehouseHoldmembersSchema(householdmembers) {
  const schema = Joi.object({
    houseHoldId: Joi.string().required(),
    userId: Joi.string().required(),
  });
  return schema.validate(householdmembers);
}

module.exports = {
  validatehouseHoldmembersSchema,
  Householdmember,
  householdmembersSchemaSchema,
};
