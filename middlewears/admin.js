module.exports = function (req, res, next) {
  // console.log(req.user);
  console.log(req.user.role);
  if (req.user.role !== "Admin")
    return res.status(403).send("access for bidden,you are not admin");
  next();
};
