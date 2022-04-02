const express = require("express");
const { viewLogin, actionLogin } = require("../controller");
const router = express.Router();
router.get("/", viewLogin);
router.post("/", actionLogin);
module.exports = router;
