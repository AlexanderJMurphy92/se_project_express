// const express = require("express");
// const mongoose = require("mongoose");
// const mainRouter = require("./routes/users");
// const clothingItemRouter = require("./routes/clothingItem");
// const authMiddleware = require("./middleware/auth");
// const setUserMiddleware = require("./middleware/setUser");

// const app = express();
// const { PORT = 3001 } = process.env;

// // Connect to MongoDB
// mongoose
//   .connect("mongodb://127.0.0.1:27017/wtwr_db")
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch(console.error);

// // Initialize express.json() to enable parsing of JSON bodies
// app.use(express.json());

// // Set user middleware (make sure this comes before any routes that need to access `req.user`)
// app.use(setUserMiddleware);

// const routes = require("./routes");
// app.use(routes);

// // Define routes
// app.use("/", mainRouter); // Routes for user registration and listing users
// app.use("/items", authMiddleware, clothingItemRouter); // Routes for clothing items, including liking/disliking

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// const express = require("express");
// const mongoose = require("mongoose");
// const mainRouter = require("./routes/users");
// const clothingItemRouter = require("./routes/clothingItem");
// const authMiddleware = require("./middleware/auth");
// const setUserMiddleware = require("./middleware/setUser");

// const app = express();
// const { PORT = 3001 } = process.env;

// mongoose
//   .connect("mongodb://127.0.0.1:27017/wtwr_db")
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch(console.error);

// app.use(express.json()); // Enables parsing JSON bodies

// app.use("/items", authMiddleware, clothingItemRouter);
// app.use(setUserMiddleware);

// // Use the specific paths for your routers
// app.use("/users", mainRouter);
// app.use("/items", authMiddleware, clothingItemRouter);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/users");
const clothingItemRouter = require("./routes/clothingItem");
const authMiddleware = require("./middleware/auth");
const setUserMiddleware = require("./middleware/setUser");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(console.error);

// Initialize express.json() first to enable parsing of JSON bodies
app.use(express.json());

app.use(setUserMiddleware);

app.use("/", mainRouter);
const routes = require("./routes");
app.use("/", authMiddleware, clothingItemRouter);
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
