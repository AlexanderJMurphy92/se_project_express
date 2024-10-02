const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  BAD_REQUEST_ERROR_CODE,
  NONEXISTENT_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
} = require("../utils/errors");

const handleError = (err, res) => {
  console.error(err);
  if (err.name === "ValidationError") {
    return res.status(BAD_REQUEST_ERROR_CODE).send({ message: "Invalid data" });
  }
  if (err.code === 11000) {
    return res.status(CONFLICT_ERROR_CODE).send({ message: "Duplicate error" });
  }
  if (err.name === "DocumentNotFoundError") {
    return res
      .status(NONEXISTENT_ERROR_CODE)
      .send({ message: "Requested resource not found" });
  }
  if (err.name === "CastError") {
    return res.status(BAD_REQUEST_ERROR_CODE).send({ message: "Invalid data" });
  }
  return res
    .status(DEFAULT_ERROR_CODE)
    .send({ message: "An error has occurred on the server." });
};

const createUser = async (req, res) => {
  const { name, avatar, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, avatar, email, password: hash });
    res
      .status(201)
      .send({ name: user.name, avatar: user.avatar, email: user.email });
  } catch (err) {
    handleError(err, res);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.send({ token });
  } catch (err) {
    if (err.message === "Incorrect email or password") {
      return res
        .status(UNAUTHORIZED_ERROR_CODE)
        .send({ message: "Authorization Required" });
    }
    handleError(err, res);
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    res.status(200).send(user);
  } catch (err) {
    handleError(err, res);
  }
};

const updateProfile = async (req, res) => {
  const { name, avatar } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true }
    ).orFail();
    res.status(200).send(user);
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = { createUser, login, getCurrentUser, updateProfile };
