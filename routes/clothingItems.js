const router = require("express").Router();

const {
  createItem,
  getAllItems,
  deleteItem,
} = require("../controllers/clothingItems");

router.get("/", getAllItems);

const auth = require("../middlewares/auth");

router.post("/", auth, createItem);

router.delete("/:itemId", auth, deleteItem);

module.exports = router;
