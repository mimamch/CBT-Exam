var express = require("express");
var router = express.Router();

const {
  user,
  viewTambahUser,
  ActionTambahUser,
  actionDeleteUser,
  viewUbahUser,
  actionUbahUser,
} = require("../controller/");

/* GET home page. */
router.get("/", user);
router.get("/tambah", viewTambahUser);
router.post("/tambah", ActionTambahUser);
router.get("/ubah/:id", viewUbahUser);
router.post("/ubah/:id", actionUbahUser);
router.get("/delete/:id", actionDeleteUser);

module.exports = router;
