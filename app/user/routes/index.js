var express = require("express");
var router = express.Router();

const { user } = require("../controller/");

/* GET home page. */
router.get("/", user);

module.exports = router;
