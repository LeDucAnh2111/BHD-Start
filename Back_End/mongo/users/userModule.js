const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const userSchema = new Schema({
  email: { type: String, require: true },
  gennder: { type: Number, require: true },
  number: { type: Number, require: true },
  username: { type: String, require: true },
  password: { type: String, require: true },
});
module.exports = mongoose.models.users || mongoose.model("users", userSchema);
