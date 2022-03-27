var express = require("express");
var router = express.Router();
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/assets/soal");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const {
  soal,
  viewTambahSoal,
  viewTambahDetailSoal,
  actionTambahMateriSoal,
  actionTambahDetailSoal,
  actionDeleteSoal,
  viewDetailSoal,
  viewPerSoalDetail,
  actionPerSoalDetail,
} = require("../controller/");

/* GET home page. */
router.get("/", soal);
router.get("/tambah", viewTambahSoal);
router.post("/tambah", actionTambahMateriSoal);
router.get("/tambah/:idMateri/:noSoal/:tipeSoal", viewTambahDetailSoal);
router.post(
  "/tambah/:idMateri/:noSoal/:tipeSoal",
  upload.single("file"),
  actionTambahDetailSoal
);
router.get("/delete/:idMateri", actionDeleteSoal);
router.get("/detail/:idMateri", viewDetailSoal);
router.get("/:idSoal/detail", viewPerSoalDetail);
router.post("/:idSoal/detail", upload.single("file"), actionPerSoalDetail);

module.exports = router;
