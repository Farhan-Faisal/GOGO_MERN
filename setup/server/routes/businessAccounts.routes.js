const router = require("express").Router();
const EmailAuthModel = require("../models/emailAuth.model");
const BusinessDetailsModel = require("../models/businessDetails.model");

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

router.route("/create").post((req, res) => {
    newEmailAuth = new EmailAuthModel({
        email: req.body.email,
        password: req.body.password,
        username: req.body.businessName,
        isBusiness: true,
    });
    newEmailAuth
        .save()
        .then(() => {
            // email authorization is saved
            newBusiness = new BusinessDetailsModel({
                email: req.body.email,
                businessName: req.body.businessName,
            });
            newBusiness
                .save()
                .then(() =>
                    res.json({ msg: "business created", business: newBusiness })
                ) // business info saved
                .catch(err => res.json({ err: err })); // business info not saved
        })
        .catch(err => res.json({ err: err })); // email authorization not saved
});

// Get a user with their biography
// Querying the cluster by username
router.route("/biography/:useremail").get(async (req, res) => {
    try {
      const user = await BusinessDetailsModel.findOne({ email: req.params.useremail });
      res.send(user);
    } catch {
      res.status(404);
      res.send({ error: "User does not exist" });
    }
  });

// Post a business with their biography
router.route("/biography").post(async (req, res) => {
    const useremail = req.body.useremail;
    const userBio = req.body.biography;
    try {
        let user = await BusinessDetailsModel.findOne({ email: useremail });
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
        const user = await BusinessDetailsModel.findOne({
            email: req.params.useremail,
        });
        res.send(user);
    } catch {
        res.status(404);
        res.send({ error: "User does not exist" });
    }
});

router.route("/image").post(upload.single("profilePic"), async (req, res) => {
    console.log("At least the request is made");
    console.log(req.file.filename);

    const useremail = req.body.email;

    try {
        let user = await BusinessDetailsModel.findOne({ email: useremail });
        user.image = req.file.filename;

        await user.save();
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(404);
        res.send(err);
    }
});

module.exports = router;
