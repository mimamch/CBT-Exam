const { Soal } = require("../../models/soal");

module.exports = {
  testPage: async (req, res) => {
    try {
      const nomorSoal = req.query.SN || 1;
      const tipeSoal = req.query.tipe || "reading";
      const idMateri = req.params.idMateri;
      console.log(nomorSoal);
      console.log(tipeSoal);
      console.log(idMateri);
      const dataSoal = await Soal.findOne({
        idSoal: idMateri,
        nomorSoal: nomorSoal,
        tipeSoal: tipeSoal,
      });
      res.render("client/testpage", { dataSoal });
    } catch (error) {
      req.flash("info", error.messsage);
      res.redirect("/admin");
    }
  },
};
