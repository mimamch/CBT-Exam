const { HistoryTest } = require("../../models/historytest");

module.exports = {
  viewHistory: async (req, res) => {
    try {
      const history = await HistoryTest.find().populate("UID MID TID");
      res.render("history/view_history", { history });
    } catch (error) {}
  },
};
