var express = require("express");
var router = express.Router();
var dashboardRouter = require("../dashboard/routes/");
var userRouter = require("../user/routes");
var soalRouter = require("../soal/routes");
var historyRouter = require("../history/routes");

router.use("/", dashboardRouter);
router.use("/user", userRouter);
router.use("/soal", soalRouter);
router.use("/history", historyRouter);

module.exports = router;
