var express = require("express");
var router = express.Router();

const { dashboard } = require("../controller/");

/* GET home page. */
router.get("/", dashboard);

module.exports = router;
