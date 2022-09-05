const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minLength: [5, "firstName should be atleast 5 characters long"],
    maxLength: [50, "firstName should be atmost 50 characters long"],
    required: true,
  },
  lastName: {
    type: String,
    minLength: [2, "lastName should be atleast 5 characters long"],
    maxLength: [50, "lastName should be atmost 50 characters long"],
    required: true,
  },
  email: {
    type: String,
    minLength: [5, "Email should be atleast 5 characters long"],
    maxLength: [255, "Email should be atmost 255 characters long"],
    required: true,
  },
  phone: {
    type: String,
    minLength: [7, "Phone should be atleast 7 digits long"],
    maxLength: [10, "Phone should be atmost 10 digits long"],
    required: true,
  },
  userName: {
    type: String,
    minLength: [5, "Username should be atleast 5 characters long"],
    maxLength: [100, "Username should be atmost 255 characters long"],
    required: true,
  },
  password: {
    type: String,
    minLength: [8, "Password should be atleast 8 characters long"],
    maxLength: [1024, "Password should be atmost 1024 characters long"],
    required: true,
  },
  role: {
    type: String,
    enum: {
      values: ["Admin", "Primary User", "Member"],
      message: "{VALUE} is not supported,",
    },
    required: true,
  },
  lastLoggedIn: {
    type: Date,
    default: new Date(Date.now()),
  },
  isActive: { type: Boolean, default: false },
  updatedBy: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

// usersSchema.methods.getAuthToken = function () {
//   return jwt.sign(
//     { _id: this._id, isAdmin: this.isAdmin },
//     config.get("jwtPrivateKey")
//   );
// };

const User = mongoose.model("user", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().min(5).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).required().unique(),
    phone: Joi.string().min(7).max(10).required(),
    userName: Joi.string().min(5).max(100).required(),
    password: Joi.string().min(5).max(1024).required(),
    role: Joi.string().required(),
    updatedBy: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(user);
};

module.exports = { User, userSchema, validateUser };
