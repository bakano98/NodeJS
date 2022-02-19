// schema for dishes

// necessary imports
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishSchema = new Schema(
  {
    name: {
      // name is of type String, and is required. It must also be unique!
      type: String,
      require: true,
      unique: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  {
    // automatically append timestamp, and update whenever document is updated
    timestamps: true,
  }
);

var Dishes = mongoose.model("Dish", dishSchema);

module.exports = Dishes;
