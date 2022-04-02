const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL);

const UserSchema = new Schema({
  name: String,
  username: String,
  password: String,
  role: { type: String, enum: ["admin", "client"], default: "client" },
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
