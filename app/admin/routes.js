var express = require("express");
var router = express.Router();
var dashboardRouter = require("../dashboard/routes/");
var userRouter = require("../user/routes");
var soalRouter = require("../soal/routes");

router.use("/", dashboardRouter);
router.use("/user", userRouter);
router.use("/soal", soalRouter);

module.exports = router;
