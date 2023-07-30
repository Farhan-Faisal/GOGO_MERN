const router = require("express").Router();
let EmailAuthModel = require("../models/emailAuth.model");
let UserDetailModel = require("../models/userDetails.model");
let BusinessDetailsModel = require("../models/businessDetails.model");
const jwt = require("jsonwebtoken");

router.route("/").post(async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email and password
  const emailAuth = await EmailAuthModel.findOne({
    email: email,
    password: password,
  });

  if (emailAuth && emailAuth.isBusiness === true) {
    // business login
    try {
      var businessDetail = await BusinessDetailsModel.findOne({
        email: emailAuth.email,
      });
      const token = jwt.sign(
        {
          id: businessDetail._id,
          businessDetail: {
            email: businessDetail.email,
            businessName: businessDetail.businessName,
          },
          isBusiness: true,
        },
        "shhhhh",
        {
          expiresIn: "2h",
        }
      );
      console.log("Business saved " + token);
      businessDetail.token = token;
      await businessDetail.save();
      res.json({ user: businessDetail, isBusiness: true });
    } catch (error) {
      throw new Error("Failed to generate token", error);
    }
  } else if (emailAuth) {
    // Login successful
    try {
      var userDetail = await UserDetailModel.findOne({
        email: emailAuth.email,
      });
      const token = jwt.sign(
        {
          id: userDetail._id,
          userDetail: {
            email: userDetail.email,
            username: userDetail.username,
            age: userDetail.age,
            gender: userDetail.gender
          },
          isBusiness: false,
        },
        "shhhhh",
        {
          expiresIn: "2h",
        }
      );
      console.log("User Saved " + token);
      userDetail.token = token;
      await userDetail.save(); // Save the user with the updated token
      res.json({ user: userDetail, isBusiness: false });
    } catch (error) {
      throw new Error("Failed to generate token", error);
    }
  } else {
    // Invalid credentials
    res.json({ err: "Invalid email or password" });
  }
});

router.route("/").get((req, res) => {
  try {
    if (req.headers && req.headers.authorization) {
      const authorization = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(authorization, "shhhhh");
      const userId = decoded.id;

      EmailAuthModel.findOne({ _id: userId }).then(function (user) {
        res.json({ user: user });
      });
    }
  } catch (e) {
    return res.status(401).send("unauthorized");
  }
});

module.exports = router;
