const jwt = require("jsonwebtoken");

module.exports = {
  middleware: async (req, res, next) => {
    try {
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
        if (token) {
          req.session.user = token;
          next();
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
