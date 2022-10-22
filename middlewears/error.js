// require("express-async-errors");
const winston = require("winston");
module.exports = function (err, req, res, next) {
  console.log(err.message);
  winston.error(err.message);
  res.status(500).send("somthing is failed in the");
};
