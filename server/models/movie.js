const mongoose = require("mongoose");
const Scema = mongoose.Schema;

const movieSchema = new Scema({
  name: String,
  genre: String,
});
module.exports = mongoose.model("Movie", movieSchema);
