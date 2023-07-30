const router = require("express").Router();
let UserDetailsModel = require("../models/userDetails.model");

/* Multer Configuration
  - Stores the picture in a front end directory
  - Stores file metadata in the Database
*/
const multer = require('multer');
const fs = require('fs');
const multerStorage = multer. diskStorage( {
  destination: (req, file,cb) => {
    cb(null, '../server/public/uploads');
  },
  
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, file.originalname)
  }
});
const upload = multer ({storage: multerStorage});

router.route("/").post((req, res) => {
  const newUserDetails = new UserDetailsModel({
    email: req.body.email,
    username: req.body.username,
    age: req.body.age,
    gender: req.body.gender,
  });

  newUserDetails
    .save()
    .then(() =>
      res.json({
        msg: "user details added",
      })
    )
    .catch((err) =>
      res.json({
        msg: "user details could not be added",
        err: err,
      })
    );
});

// Get a user with their biography
// Querying the cluster by username
router.route("/biography/:useremail").get(async (req, res) => {
  try {
    const user = await UserDetailsModel.findOne({ email: req.params.useremail });
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "User does not exist" });
  }
});

// Post a user with their biography
router.route("/biography").post(async (req, res) => {
  const useremail = req.body.useremail;
  const userBio = req.body.biography;
  try {
    let user = await UserDetailsModel.findOne({ email: useremail });
    user.biography = userBio;
    await user.save();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(404);
    res.send(err);
  }
});

router.route("/image/:useremail").get(async (req, res) => {
  try {
    const user = await UserDetailsModel.findOne({ email: req.params.useremail });
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "User does not exist" });
  }
});

router.route("/image").post(upload.single("profilePic"), async(req, res) => {
  console.log("POST request is made");
  console.log(req.file.filename);

  const useremail = req.body.email;

  try{
    let user = await UserDetailsModel.findOne({ email: useremail });
    user.image = req.file.filename; // Storing image file name in db for specific user
    
    await user.save();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(404);
    res.send(err);
  }
});

module.exports = router;
