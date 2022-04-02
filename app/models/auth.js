const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authSchema = new Schema({
  fullName: String,
  username: String,
  password: String,
  role: { type: String, enum: ["admin", "client"] },
});

const Auth = mongoose.model("auth", authSchema);

module.exports = { Auth };
