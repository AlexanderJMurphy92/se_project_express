const clothingItem = require("../models/clothingItem");

const {
  BAD_REQUEST_ERROR_CODE,
  NONEXISTENT_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} = require("../utils/errors");

const handleError = (err, res) => {
  console.error(err);

  if (err.name === "DocumentNotFoundError") {
    return res
      .status(NONEXISTENT_ERROR_CODE)
      .send({ message: "Requested resource not found" });
  }

  if (err.name === "CastError") {
    return res
      .status(BAD_REQUEST_ERROR_CODE)
      .send({ message: "Invalid data provided" });
  }

  return res
    .status(DEFAULT_ERROR_CODE)
    .send({ message: "An error occurred on the server" });
};

module.exports.likeItem = (req, res) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail(() => {
      const error = new Error("Item not found");
      error.name = "DocumentNotFoundError";
      throw error;
    })
    .then((updatedItem) => res.status(200).send(updatedItem))
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports.disLikeItem = (req, res) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail(() => {
      const error = new Error("Item not found");
      error.name = "DocumentNotFoundError";
      throw error;
    })
    .then((updatedItem) => res.status(200).send(updatedItem))
    .catch((err) => {
      handleError(err, res);
    });
};
