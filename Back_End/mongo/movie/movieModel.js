const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const movieSchema = new Schema({
  title: { type: String, required: true },
  thumb: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  genre: { type: String, require: true },
  release_date: { type: Date, required: true },
  status: { type: Number, required: true },
});
module.exports =
  mongoose.models.movies || mongoose.model("movies", movieSchema);
