const { HistoryTest, MakeTID } = require("../../models/historytest");
const { Soal, idSoal } = require("../../models/soal");

module.exports = {
  testPage: async (req, res) => {
    try {
      const nomorSoal = req.query.SN || 1;
      const tipeSoal = req.query.tipe || "reading";
      const idMateri = req.params.idMateri;
      const dataSoal = await Soal.findOne({
        idSoal: idMateri,
        nomorSoal: nomorSoal,
        tipeSoal: tipeSoal,
      });
      res.render("client/testpage", { dataSoal });
    } catch (error) {
      req.flash("info", error.messsage);
      res.redirect("/");
    }
  },
  checkAnswer: async (req, res) => {
    try {
      let data = JSON.parse(req.body.data);

      let getMateriSoal = (arr) => {
        return Object.entries(arr[0]).map(([key, val]) => {
          return key.split(".")[4];
        })[0];
      };
      const dataSoal = await Soal.find(
        { idSoal: getMateriSoal(data) },
        "nomorSoal jawabanBenar tipeSoal"
      );
      let hasil = { nilai: 0, jawabanBenar: [], jawaban: [] };
      data.forEach((e) => {
        Object.entries(e).forEach(([key, value]) => {
          let [tipe, TID, UID, SN, MID] = key.split(".");
          hasil.UID = UID;
          hasil.TID = TID;
          hasil.MID = MID;
          hasil.jawaban.push([{ tipe: tipe, SN: SN, jawaban: value }]);
          dataSoal.forEach((e) => {
            if (
              tipe == e.tipeSoal &&
              SN == e.nomorSoal &&
              value == e.jawabanBenar
            ) {
              hasil.nilai += 20;
              hasil.jawabanBenar.push(`${tipe}.${SN}`);
            }
          });
        });
      });

      const duplicate = HistoryTest.countDocuments({ TID: hasil.TID }).then(
        async (e) => {
          if (!e > 0) {
            let startTime = req.body.startTime;
            await MakeTID.findByIdAndUpdate(
              { _id: hasil.TID },
              { startTime: startTime }
            );
            const makeHistory = new HistoryTest({
              nilai: hasil.nilai,
              jawabanBenar: hasil.jawabanBenar,
              jawaban: hasil.jawaban,
              UID: hasil.UID,
              TID: hasil.TID,
              MID: hasil.MID,
            });
            await makeHistory.save();
            res.json(makeHistory);
          } else {
            res.status(403).json({ TID: hasil.TID, message: "Test is Done" });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
  dashboardClient: async (req, res) => {
    const { UID } = req.session.user;
    const historyTestUser = await HistoryTest.find({ UID: UID }).populate(
      "TID MID"
    );
    const materi = await idSoal.find();
    res.render("client/dashboard/dashboardview", { historyTestUser, materi });
  },
  newTest: async (req, res) => {
    const MID = req.params.MID;
    res.render("client/dashboard/viewNewTest", { MID });
  },
  startTest: async (req, res) => {
    try {
      const MID = req.params.MID;
      const maketid = new MakeTID({
        UID: req.session.user.UID,
        MID: MID,
      });
      await maketid.save();
      res.redirect(
        `/client/${MID}?TID=${maketid._id}&UID=${req.session.user.UID}`
      );
    } catch (error) {
      console.log(error);
    }
  },
  reviewTest: async (req, res) => {
    try {
      let soalReading = [];
      let soalListening = [];
      const history = await HistoryTest.findOne({ TID: req.params.TID });
      const nomorSoal = req.query.SN || 1;
      const tipeSoal = req.query.tipe || "reading";
      const idMateri = history.MID;
      const dataSoal = await Soal.findOne({
        idSoal: idMateri,
        nomorSoal: nomorSoal,
        tipeSoal: tipeSoal,
      });

      res.render("client/testpage/reviewpage", {
        dataSoal,
        UID: req.session.user.UID,
        TID: req.params.TID,
        MID: idMateri,
        history,
      });
    } catch (error) {}
  },
};
