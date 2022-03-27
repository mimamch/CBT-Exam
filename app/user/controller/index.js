const { default: axios } = require("axios");
const { User } = require("../../models/user");
const bcrypt = require("bcrypt");

module.exports = {
  user: async (req, res) => {
    try {
      const userData = await User.find();

      res.render("user/view_user", { data: userData });
    } catch (error) {
      req.flash("info", error.message);
      res.redirect(`/admin/user`);
    }
  },
  viewTambahUser: async (req, res) => {
    res.render("user/tambah_user");
  },
  ActionTambahUser: async (req, res) => {
    try {
      const { name, username, password } = req.body;
      const hashPass = bcrypt.hashSync(password, 10);
      const newUser = new User({ name, username, password: hashPass });
      newUser.save();
      req.flash("info", "Berhasil Tambah User");
      res.redirect("/admin/user");
    } catch (error) {
      req.flash("info", error.message);
      res.redirect(`/admin/user`);
    }
  },
  viewUbahUser: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      res.render("user/ubah_user", { user: user });
    } catch (error) {
      req.flash("info", error.message);
      res.redirect(`/admin/user`);
    }
  },
  actionUbahUser: async (req, res) => {
    try {
      const id = req.params.id;
      const { name, username, password } = req.body;
      if (!password) {
        await User.findByIdAndUpdate(id, { name, username });
      } else {
        const hashPass = bcrypt.hashSync(password, 10);
        await User.findByIdAndUpdate(id, {
          name,
          username,
          password: hashPass,
        });
      }
      req.flash("info", "Berhasil Ubah User");
      res.redirect("/admin/user");
    } catch (error) {
      req.flash("info", error.message);
      res.redirect(`/admin/user`);
    }
  },
  actionDeleteUser: async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await User.findByIdAndDelete(id);
      req.flash("info", `Berhasil Delete ${deleted.name}`);
      res.redirect("/admin/user");
    } catch (error) {
      req.flash("info", error.message);
      res.redirect(`/admin/user`);
    }
  },
};
