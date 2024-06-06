const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const typeSeatsSchema = new Schema({
  typeSeats: { type: String, require: true },
  description: { type: String, require: true },
});

module.exports =
  mongoose.models.type_seats || mongoose.model("type_seats", typeSeatsSchema);
