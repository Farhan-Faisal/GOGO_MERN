const router = require("express").Router();
let InterestModel = require("../models/interestModel");

// Get all userIntersts documents
router.route("/userInterests").get(async (req, res) => {
  const userInterestDocs = await InterestModel.find();
  res.send(userInterestDocs);
});

// Get userInterest document of one user
router.route("/userInterests/:email").get(async (req, res) => {


    const userInterestDoc = await InterestModel.find({
      email: req.params.email,
    });
    // console.log(req.params.username);
    // console.log(userInterestDoc[0].interestList)
    res.send(userInterestDoc);
});

// Post a userInterest
router.route("/userInterests").post(async (req, res) => {
  const interestList = req.body.interestList;
  const email = req.body.email;

  const newInterestDoc = new InterestModel({
    interestList: interestList,
    email: email,
  });

  const currentDatabaseInterests = await InterestModel.find({
    email: email,
  });

  if (currentDatabaseInterests.length === 0) {
    await newInterestDoc.save();
    console.log("user interest document posted");
    res.send(newInterestDoc);
  } else {
    // res.status(400);
    // res.send({error: "Interest already exists in database"});
    console.log("Interest already exists in database");
  }
});

router.route("/userInterests/post").post((req, res) => {
  InterestModel.findOne({email: req.body.email})
  .then(response => {
    if(response === null) {
      const newInterestDoc = new InterestModel({
        email: req.body.email,
        interestList: req.body.interestList,
      });
      newInterestDoc.save()                                     // new interest document is not saving
      .then(response => res.json({msg: "created", response}))
      .catch(err => res.json({err, msg: "inerr"}));
    } else {
      res.json("user already exists");
    }
  })
  .catch(err => res.json({err, msg: "err"}));
})

// Delete the userInterest document of a particular user
router.route("/userInterests/:email").delete(async (req, res) => {
  try {
    await InterestModel.deleteOne({ email: req.params.email });
    console.log("user interest document deleted");
    res.status(204).send();
  } catch {
    // res.status(404)
    // res.send({ error: "Post doesn't exist!" })
    console.log("This user interest document does not exist");
  }
});

module.exports = router;