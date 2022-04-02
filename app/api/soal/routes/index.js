const express = require("express");
const { getSoal, getDetailSoal } = require("../controller");
const router = express.Router();
router.get("/getSoal", getSoal);
router.use("/detail-soal/:id", getDetailSoal);
module.exports = router;
