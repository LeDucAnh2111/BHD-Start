const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const roomSchema = new Schema({
  room_number: { type: Number, require: true },
});

module.exports = mongoose.models.room || mongoose.model("room", roomSchema);
