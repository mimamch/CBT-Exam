const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const makeTID = new Schema({
  startTime: { type: Date, default: Date.now() },
  UID: { type: Schema.ObjectId, ref: "User" },
  MID: { type: Schema.ObjectId, ref: "IdSoal" },
});

const history = new Schema({
  nilai: Number,
  jawabanBenar: [],
  jawaban: [],
  UID: { type: Schema.ObjectId, ref: "User" },
  TID: { type: Schema.ObjectId, ref: "MakeTID" },
  MID: { type: Schema.ObjectId, ref: "idSoal" },
});

const MakeTID = mongoose.model("MakeTID", makeTID);
const HistoryTest = mongoose.model("HistoryTest", history);

module.exports = {
  HistoryTest,
  MakeTID,
};
