const { User } = require("../../models/user");
const { idSoal, Soal } = require("../../models/soal");
const jwt = require("jsonwebtoken");
module.exports = {
  dashboard: async (req, res) => {
    try {
      if (req.session.token) {
        const { username, UID, name } = jwt.verify(
          req.session.token,
          process.env.secretKey
        );
        res.locals.user = { name, username, UID };
      }

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
