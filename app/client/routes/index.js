var express = require("express");
const { testPage } = require("../controller");
var router = express.Router();
router.get("/:idMateri", testPage);
module.exports = router;
