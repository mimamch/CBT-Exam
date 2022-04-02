const express = require("express");
const router = express.Router();
const soal = require("./soal/routes");
router.use("/soal", soal);
module.exports = router;
