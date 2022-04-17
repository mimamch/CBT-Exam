const jwt = require("jsonwebtoken");

module.exports = {
  middleware: async (req, res, next) => {
    try {
      // CHECK IS LOGGED

      //

      if (!req.session.token) {
        if (req.cookies.token) {
          req.session.token = req.cookies.token;
        } else {
          req.flash("info", "Session Ended, Please Login");
          res.redirect("/");
        }
      }
      if (req.session.token) {
        const token = jwt.verify(req.session.token, process.env.secretKey);
        const url = req.baseUrl.replace("/", "");

        if (token.role != url) return res.redirect(`/${token.role}`);
        if (token) {
          req.session.user = token;
          return next();
        } else {
          req.flash("info", "Session Ended, Please Login");
          res.redirect("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  logOut: async (req, res, next) => {
    req.session.destroy(function (err) {
      res.clearCookie("token");
      req.session = null;
      res.redirect("/");
      res.end();
    });
  },
};
