const { User } = require("../../models/user");
const { idSoal, Soal } = require("../../models/soal");
module.exports = {
  dashboard: async (req, res) => {
    try {
      const totalUser = await User.countDocuments();
      const totalSoal = await Soal.countDocuments();
      const totalMateriSoal = await idSoal.countDocuments();
      res.render("dashboard/view_dashboard", {
        totalUser,
        totalMateriSoal,
        totalSoal,
      });
    } catch (error) {
      req.flash("info", error.message);
      res.redirect(`/admin/user`);
    }
  },
};
