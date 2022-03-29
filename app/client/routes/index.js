var express = require("express");
const { testPage } = require("../controller");
var router = express.Router();
router.get("/:idMateri", testPage);
router.post("/:idMateri/send", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});
module.exports = router;
