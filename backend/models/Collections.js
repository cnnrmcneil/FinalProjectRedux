const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  creator: {
    type: String,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  links: {
    type: Array,
    required: true,
    link: {
      type: String,
      required: true,
    },
  },

  time: {
    type: Date,
    default: Date.now,
  },
});

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;
