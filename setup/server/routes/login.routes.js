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
            gender: userDetail.gender,
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

/* DEV-CGP-6 */
router.route("/token/:fb_email").get(async (req, res) => {
  try {
    const userDetail = await UserDetailModel.findOne({
      email: req.params.fb_email,
    });
    console.log(userDetail);
    res.send(userDetail);
  } catch {
    res.status(404);
    res.send({ error: "User does not exist" });
  }
});

router.route("/facebook/first-time").post(async (req, res) => {
  try {
    const userDetail = new UserDetailModel({
      email: req.body.email,
      username: req.body.username,
      age: req.body.age,
      gender: req.body.gender,
    });

    userDetail.save().then(async () => {
      console.log("new user made");
      var savedUser = await UserDetailModel.findOne({ email: req.body.email });
      const token = jwt.sign(
        {
          id: savedUser._id,
          userDetail: {
            email: savedUser.email,
            username: savedUser.username,
            age: savedUser.age,
            gender: savedUser.gender,
          },
          isBusiness: false,
        },
        "shhhhh",
        { expiresIn: "2h" }
      );
      savedUser.token = token;
      await savedUser.save();

      console.log(savedUser);
      res.send({ token: token });
    });
  } catch {
    res.status(404);
    res.send({ error: "User does not exist" });
  }
});

//DEV-CGP-5: check if account with google login exists
router.route("/google/check").post(async (req, res) => {
  var googleUser = await UserDetailModel.findOne({
    email: req.body.email,
  });
  console.log({ googleUser });
  if (googleUser) {
    try {
      const token = jwt.sign(
        {
          id: googleUser._id,
          userDetail: {
            email: googleUser.email,
            username: googleUser.username,
            age: googleUser.age,
            gender: googleUser.gender,
          },
          isBusiness: false,
        },
        "shhhhh",
        { expiresIn: "2h" }
      );
      googleUser.token = token;
      await googleUser.save();
      res.send({ user: googleUser, isBusiness: false });
    } catch {
      res.status(404);
      res.send({ error: "unable to generate token" });
    }
  } else res.json({ user: null });
});

module.exports = router;
