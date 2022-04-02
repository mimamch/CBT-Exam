var express = require("express");
const {
  testPage,
  checkAnswer,
  dashboardClient,
  newTest,
  startTest,
  reviewTest,
} = require("../controller");
var router = express.Router();
router.get("/", dashboardClient);
router.get("/new/:MID", newTest);
router.get("/start/:MID", startTest);
router.get("/:idMateri", testPage);
router.post("/:idMateri/send", checkAnswer);
router.get("/review/:TID", reviewTest);
module.exports = router;
