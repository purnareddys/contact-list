const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: { type: String, required: true },
  DOB: { type: String, required: false },
  Phone: { type: Array, required: true },
  email: { type: Array, required: false },
  creator: { type: String, required: true },
});

module.exports = mongoose.model("Contact", contactSchema);
