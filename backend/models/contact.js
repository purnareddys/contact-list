const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: { type: String, required: true },
  DOB: { type: String, required: false },
  Phone: { type: Array, required: true },
  email: { type: Array, required: false },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Contact", contactSchema);
