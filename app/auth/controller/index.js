const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../models/user");

module.exports = {
  viewLogin: async (req, res) => {
    try {
      if (req.cookies.token || req.session.token) {
        const token = jwt.verify(
          req.cookies.token || req.session.token,
          process.env.secretKey
        );
        if (token) return res.redirect(`/${token.role}`);
      }
      res.render("login/view-login");
    } catch (error) {
      console.log(error);
    }
  },
  actionLogin: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      User.findOne({ username })
        .then((respons) => {
          if (!respons) {
            req.flash("info", "User not found");
            res.redirect("/");
          } else {
            const isPass = bcrypt.compareSync(password, respons.password);
            if (isPass) {
              const token = jwt.sign(
                {
                  UID: respons._id,
                  username,
                  name: respons.name,
                  role: respons.role,
                },
                process.env.secretKey
              );
              req.session.token = token;
              res.cookie("token", token);
              req.session.user = {
                name: respons.name,
                username: respons.username,
                UID: respons._id,
                role: respons.role,
              };
              if (respons.role == "admin") {
                res.redirect("/admin");
              } else {
                res.redirect("/client");
              }
            } else {
              req.flash("info", "Password incorrect");
              res.redirect("/");
            }
          }
        })
        .catch((error) => {
          req.flash("info", error.message);
          res.redirect("/");
        });
    } catch (error) {
      req.flash("info", error.message);
      res.redirect("/");
    }
  },
};
