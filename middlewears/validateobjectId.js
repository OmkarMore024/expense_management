const mongoose = require("mongoose");

module.exports = function (req, res, next) {
  // mongoose.Schema.Types.ObjectId.isValid()
  const isVali = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isVali)
    return res.status(400).send("invalid id ,validated in middleware");
  next();
};
