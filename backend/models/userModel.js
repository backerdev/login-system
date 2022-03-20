const mongoose = require("mongoose");

const useSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add a name"],
    },
    email: {
      type: String,
      require: [true, "Please add a email"],
    },
    password: {
      type: String,
      require: [true, "Please add a password"],
    },
    refresh_token: {
      type: String,
      require: [true, "Please add a secret"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", useSchema);
