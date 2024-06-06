const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const screeningSchema = new mongoose.Schema({
  movie_id: { type: String, require: true },
  show_date: { type: Date, require: true },
  start_time: { type: String, require: true },
  expiration_time: { type: String, require: true },
  room: { type: String, require: true },
});

module.exports =
  mongoose.models.screening || mongoose.model("screening", screeningSchema);
