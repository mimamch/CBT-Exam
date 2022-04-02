const express = require("express");
const { viewHistory } = require("../controller");
const router = express.Router();
router.get("/", viewHistory);
module.exports = router;
