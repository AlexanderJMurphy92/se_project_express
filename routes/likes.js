const router = require("express").Router();

const { likeItem, disLikeItem } = require("../controllers/likes");

const auth = require("../middlewares/auth");

router.put("/:itemId/likes", auth, likeItem);

router.delete("/:itemId/likes", auth, disLikeItem);

module.exports = router;
