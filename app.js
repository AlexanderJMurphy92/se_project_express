const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;
const app = express();
const cors = require("cors");

app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {})
  .catch(() => {});

const routes = require("./routes");

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {});
