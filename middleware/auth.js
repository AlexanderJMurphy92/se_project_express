module.exports = (req, res, next) => {
  if (req.user && req.user._id) {
    next();
  } else {
    res.status(401).send({ message: "Unauthorized: No user ID provided" });
  }
};
