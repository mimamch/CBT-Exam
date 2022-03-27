const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL);

const idSoalSchema = new Schema(
  {
    materiSoal: String,
  },
  { timestamps: true }
);

const soalSchema = new Schema({
  idSoal: { type: Schema.ObjectId, ref: "idSoal" },
  nomorSoal: Number,
  soal: String,
  path: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String,
  jawabanBenar: String,
  tipeSoal: {
    type: String,
    enum: ["reading", "listening"],
  },
});

const idSoal = mongoose.model("idSoal", idSoalSchema);
const Soal = mongoose.model("Soal", soalSchema);

module.exports = {
  idSoal,
  Soal,
};
