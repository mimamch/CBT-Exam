const { default: axios } = require("axios");

module.exports = {
  user: async (req, res) => {
    const user = await axios.get("https://fakestoreapi.com/users");
    res.render("user/view_user", { data: user.data });
  },
};
