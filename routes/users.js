const express = require("express");
// const router = express.Router();
const User = require("../models/user");
const router = require("express").Router();
const { getUsers, createUser, getUser } = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/:userId", getUser);
router.post("/users", createUser);

module.exports = router;
