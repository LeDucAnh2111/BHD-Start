const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const ticketSchema = new Schema({
  screening_id: { type: Object, require: true },
  user_id: { type: String, require: true },
  movie: { type: [Object], require: true },
  seats_number: { type: [Object], require: true },
  purchase_date: { type: Date, require: true },
  price: { type: String, require: true },
});

module.exports =
  mongoose.models.ticket || mongoose.model("ticket", ticketSchema);
