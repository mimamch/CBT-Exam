var express = require("express");
var router = express.Router();

const { soal } = require("../controller/");

/* GET home page. */
router.get("/", soal);

module.exports = router;
