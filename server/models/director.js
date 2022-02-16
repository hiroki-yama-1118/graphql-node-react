const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const directorSchema = new Schema({
  name: String,
  genre: Number,
});
module.exports = mongoose.model("Director", directorSchema);
