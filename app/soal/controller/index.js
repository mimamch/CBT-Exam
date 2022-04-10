const { Soal, idSoal } = require("../../models/soal");
const fs = require("fs");
const path = require("path");
const publicPath = path.resolve("public");

module.exports = {
  soal: async (req, res) => {
    try {
      const soal = await idSoal.find();
      res.render("soal/view_soal", { soal });
    } catch (error) {
      req.flash("info", error.message);
      res.redirect(`/admin/user`);
    }
  },
  viewTambahSoal: async (req, res) => {
    res.render("soal/view_tambah_materi_soal");
  },
  actionTambahMateriSoal: async (req, res) => {
    try {
      const saveMateri = new idSoal({
        materiSoal: req.body.materiSoal,
      });
      saveMateri.save((err, data) => {
        if (err) console.log(err);
        req.flash("info", "Berhasil Tambah Materi Soal");
        res.redirect(`/admin/soal/tambah/${data._id}/1/reading`);
      });
    } catch (error) {
      req.flash("info", error.message);
      res.redirect(`/admin/soal`);
    }
  },
  viewTambahDetailSoal: async (req, res) => {
    try {
      const nomorSoal = req.params.noSoal;
      const tipeSoal = req.params.tipeSoal;
      res.render("soal/view_tambah_soal", { nomorSoal, tipeSoal });
    } catch (error) {
      req.flash("info", error.message);
      res.redirect(`/admin/soal`);
    }
  },
  actionTambahDetailSoal: async (req, res) => {
    try {
      const nomorSoal = req.params.noSoal;
      const idMateri = req.params.idMateri;
      const tipeSoal = req.params.tipeSoal;
      const duplicate = await Soal.findOne({
        idSoal: idMateri,
        nomorSoal: nomorSoal,
        tipeSoal: tipeSoal,
      });
      if (duplicate) {
        if (duplicate.path) {
          duplicate.path.forEach((e) => {
            fs.unlinkSync(path.join(publicPath, `assets/soal/${e}`));
          });
        }
        await Soal.findOneAndDelete({
          idSoal: idMateri,
          nomorSoal: nomorSoal,
          tipeSoal: tipeSoal,
        });
      }
      if (req.files) {
        const pathSoal = [];
        if (req.files.file) {
          req.files.file.forEach((e) => pathSoal.push(e.filename));
        }
        const sendSoal = new Soal({
          idSoal: req.params.idMateri,
          nomorSoal: nomorSoal,
          soal: req.body.soal,
          path: req.files.file ? pathSoal : null,
          option1: req.files.optionpicture
            ? req.files.optionpicture[0].filename
            : req.body.option1,
          option2: req.files.optionpicture
            ? req.files.optionpicture[1].filename
            : req.body.option2,
          option3: req.files.optionpicture
            ? req.files.optionpicture[2].filename
            : req.body.option3,
          option4: req.files.optionpicture
            ? req.files.optionpicture[3].filename
            : req.body.option4,
          jawabanBenar: req.body.jawabanBenar,
          tipeSoal: tipeSoal,
          isOptionPicture: req.files.optionpicture ? true : false,
          pembahasan: req.body.pembahasan,
        });
        sendSoal.save((err, data) => {
          if (err) console.log(err);
        });
      } else {
        const sendSoal = new Soal({
          idSoal: req.params.idMateri,
          nomorSoal: nomorSoal,
          soal: req.body.soal,
          option1: req.body.option1,
          option2: req.body.option2,
          option3: req.body.option3,
          option4: req.body.option4,
          jawabanBenar: req.body.jawabanBenar,
          tipeSoal: tipeSoal,
          pembahasan: req.body.pembahasan,
        });
        sendSoal.save((err, data) => {
          if (err) console.log(err);
        });
      }
      if (tipeSoal == "reading" && nomorSoal >= 20) {
        res.redirect(`/admin/soal/tambah/${req.params.idMateri}/1/listening`);
        return;
      }
      if (tipeSoal == "listening" && nomorSoal >= 20) {
        req.flash("info", "Berhasil Menambahkan Soal");
        res.redirect(`/admin/soal`);
        return;
      }

      res.redirect(
        `/admin/soal/tambah/${req.params.idMateri}/${
          parseInt(nomorSoal) + 1
        }/${tipeSoal}`
      );
    } catch (error) {
      console.log(error);
      req.flash("info", error.message);
      res.redirect(`/admin/soal`);
    }

    // try {
    //   const nomorSoal = req.params.noSoal;
    //   const idMateri = req.params.idMateri;
    //   const tipeSoal = req.params.tipeSoal;
    //   const duplicate = await Soal.find({
    //     idSoal: idMateri,
    //     nomorSoal: nomorSoal,
    //     tipeSoal: tipeSoal,
    //   });
    //   if (duplicate.length != 0) {
    //     if (duplicate[0].path) {
    //       fs.unlinkSync(`./public/assets/soal/${duplicate[0].path}`);
    //     }
    //     await Soal.findOneAndDelete({
    //       idSoal: idMateri,
    //       nomorSoal: nomorSoal,
    //       tipeSoal: tipeSoal,
    //     });
    //   }
    //   if (req.file) {
    //     const sendSoal = new Soal({
    //       idSoal: req.params.idMateri,
    //       nomorSoal: nomorSoal,
    //       soal: req.body.soal,
    //       path: req.file.filename,
    //       option1: req.body.option1,
    //       option2: req.body.option2,
    //       option3: req.body.option3,
    //       option4: req.body.option4,
    //       jawabanBenar: req.body.jawabanBenar,
    //       tipeSoal: tipeSoal,
    //     });
    //     sendSoal.save((err, data) => {
    //       if (err) console.log(err);
    //     });
    //   } else {
    //     const sendSoal = new Soal({
    //       idSoal: req.params.idMateri,
    //       nomorSoal: nomorSoal,
    //       soal: req.body.soal,
    //       option1: req.body.option1,
    //       option2: req.body.option2,
    //       option3: req.body.option3,
    //       option4: req.body.option4,
    //       jawabanBenar: req.body.jawabanBenar,
    //       tipeSoal: tipeSoal,
    //     });
    //     sendSoal.save((err, data) => {
    //       if (err) console.log(err);
    //     });
    //   }
    //   if (tipeSoal == "reading" && nomorSoal >= 20) {
    //     res.redirect(`/admin/soal/tambah/${req.params.idMateri}/1/listening`);
    //     return;
    //   }
    //   if (tipeSoal == "listening" && nomorSoal >= 20) {
    //     req.flash("info", "Berhasil Menambahkan Soal");
    //     res.redirect(`/admin/soal`);
    //     return;
    //   }

    //   res.redirect(
    //     `/admin/soal/tambah/${req.params.idMateri}/${
    //       parseInt(nomorSoal) + 1
    //     }/${tipeSoal}`
    //   );
    // } catch (error) {
    //   req.flash("info", error.message);
    //   res.redirect(`/admin/soal`);
    // }
  },
  actionDeleteSoal: async (req, res) => {
    try {
      const idMateri = req.params.idMateri;
      const soal = await Soal.find({ idSoal: idMateri }, "path");
      soal.forEach(async (aa) => {
        if (aa.path) {
          aa.path.forEach(async (e) => {
            fs.unlinkSync(path.join(publicPath, `assets/soal/${e}`));
          });
        }
        await Soal.findByIdAndDelete(aa._id);
      });
      await idSoal.findByIdAndDelete(idMateri);
      req.flash("info", "Berhasil Menghapus Soal");
      res.redirect("/admin/soal");
    } catch (error) {
      req.flash("info", error.message);
      res.redirect(`/admin/soal`);
    }
  },
  viewDetailSoal: async (req, res) => {
    try {
      const dataSoal = await Soal.find({ idSoal: req.params.idMateri });
      const materiSoal = await idSoal.findById(req.params.idMateri);
      res.render("soal/view_detail_soal", { dataSoal, materiSoal });
    } catch (error) {
      req.flash("info", error.message);
      res.redirect(`/admin/soal`);
    }
  },
  viewPerSoalDetail: async (req, res) => {
    try {
      const id = req.params.idSoal;
      const dataSoal = await Soal.findById(id);
      const materiSoal = await idSoal.findById(dataSoal.idSoal);
      res.render("soal/view_soal_detail", { dataSoal, materiSoal });
    } catch (error) {
      req.flash("info", error.message);
      res.redirect(`/admin/soal`);
    }
  },
  actionPerSoalDetail: async (req, res) => {
    try {
      const id = req.params.idSoal;
      if (req.files) {
        const isFile = await Soal.findById(id, "path");
        if (isFile.path) {
          isFile.path.forEach((e) => {
            fs.unlinkSync(path.join(publicPath, `assets/soal/${e}`));
          });
        }

        const pathSoal = [];
        if (req.files.file) {
          req.files.file.forEach((e) => pathSoal.push(e.filename));
        }

        const success = await Soal.findByIdAndUpdate(id, {
          soal: req.body.soal,
          option1: req.body.option1,
          option2: req.body.option2,
          option3: req.body.option3,
          option4: req.body.option4,
          jawabanBenar: req.body.jawabanBenar,
          path: pathSoal,
          pembahasan: req.body.pembahasan,
        });
      } else {
        const success = await Soal.findByIdAndUpdate(id, {
          soal: req.body.soal,
          option1: req.body.option1,
          option2: req.body.option2,
          option3: req.body.option3,
          option4: req.body.option4,
          jawabanBenar: req.body.jawabanBenar,
          pembahasan: req.body.pembahasan,
        });
      }
      req.flash("info", "Berhasil Ubah");
      res.redirect("/admin/soal");
    } catch (error) {
      req.flash("info", error.message);
      res.redirect(`/admin/soal`);
    }
  },
};
