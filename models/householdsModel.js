const express=require("express");
const mongoose=require("mongoose");
const Joi = require("joi");
const ObjectId=require("joi-objectid")(Joi);

const Schema = mongoose.Schema;

const houseHoldSchema = new Schema({
    name: {
        type: String,
        minLength: [3, "Username should be atleast 3 characters long"],
        maxLength: [20, "Username should be atmost 20 characters long"],
        required: true,
      },
    addressLine1:{
        type: String,
        minLength: [5, "Username should be atleast 5 characters long"],
        maxLength: [30, "Username should be atmost 30 characters long"],
        required: true,
    },
    addressLine2:{    
        type: String,
        minLength: [5, "Username should be atleast 5 characters long"],
        maxLength: [30, "Username should be atmost 30 characters long"],
        // required: true,
    },
    area:{
        type: String,
        minLength: [3, "Username should be atleast 3 characters long"],
        maxLength: [25, "Username should be atmost 25 characters long"],
        required: true,
    },
    city:{
        type: String,
        minLength: [3, "Username should be atleast 3 characters long"],
        maxLength: [15, "Username should be atmost 15 characters long"],
        required: true,
    },
    state:{
        type: String,
        minLength: [3, "Username should be atleast 8 characters long"],
        maxLength: [15, "Username should be atmost 15 characters long"],
        required: true,
    },
    zipcode:{
        type: String,
        minLength: [2, "Username should be atleast 8 characters long"],
        maxLength: [8, "Username should be atmost 8 characters long"],
        required: true,
    }
});

const HouseHold = mongoose.model("household", houseHoldSchema);

function validateHousehold(household) {
      const schema = Joi.object({
        name :Joi.string().min(3).max(20).required(),
        addressLine1 :Joi.string().min(3).max(20).required(),
        addressLine2:Joi.string().min(3).max(20).required(),
        area:Joi.string().min(3).max(20).required(),
        city:Joi.string().min(3).max(20).required(),
        state:Joi.string().min(3).max(20).required(),
        zipcode:Joi.string().min(3).max(20).required(),  
      });
      return schema.validate(household);
       
    }
  
  module.exports = {validateHousehold,HouseHold ,houseHoldSchema};
 




