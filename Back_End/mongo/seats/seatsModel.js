const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const seatsSchema = new Schema({
  row: { type: Number, require: true },
  colums: { type: String, require: true },
  typeSeat: { type: String, require: true },
});

module.exports = mongoose.models.seats || mongoose.model("seats", seatsSchema);
