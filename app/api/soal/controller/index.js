const { Soal, idSoal } = require("../../../models/soal");

module.exports = {
  getSoal: async (req, res) => {
    try {
      const soal = await Soal.find();
      const soalId = await idSoal.find();
      console.log(soalId);
      res.json(soalId);
    } catch (error) {}
  },
  getDetailSoal: async (req, res) => {
    try {
      const soal = await Soal.find({ idSoal: req.params.id });
      res.json(soal);
    } catch (error) {}
  },
};
