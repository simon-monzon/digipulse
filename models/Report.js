const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
