const mongoose = require("mongoose");

const interestSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    minlength: 2,
  },
  interestList: {
    type: [String],
    required: [true, "interests list is required"],
  },
});

const InterestModel = mongoose.model("interestmodels", interestSchema);
module.exports = InterestModel;
