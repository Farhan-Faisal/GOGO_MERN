const mongoose = require("mongoose");

const businessDetails = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Email address is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  businessName: {
    type: String,
    trim: true,
    required: [true, "Business name is required"],
    minLength: [2, "Business name too short"],
  },
  token: {
    type: String,
    default: null,
  },
  biography: {
    type: String,
    trim: true,
  },
  image: {
    type: String
  },
});

const BusinessDetailsModel = mongoose.model("business-details", businessDetails);
module.exports = BusinessDetailsModel;
