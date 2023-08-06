const router = require("express").Router();
let UserEventsModel = require("../models/userEventsModel");

const multer = require('multer');
const fs = require('fs');
const multerStorage = multer. diskStorage( {
  destination: (req, file,cb) => {
    cb(null, 'public/uploads');
  },
  
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, file.originalname)
  }
});

const upload = multer ({storage: multerStorage});

router.get("/userevents", (req, res) => {
  UserEventsModel.find().populate(["creator"])
    .then((userEvents) => res.json(userEvents))
    .catch((err) => res.status(401).json("Error: " + err));
});

router.post("/userevents", upload.single("eventPic"), async (req, res) => {
  console.log("At least the request is made");
  console.log(req.file);
  console.log(req.file.filename);

  const creator = req.body.creator;
  const creator_ref = req.body.creator_ref;
  const title = req.body.title;
  const date = req.body.date;
  const location = req.body.location;
  const price = req.body.price;
  const description = req.body.description;
  const ticketLink = req.body.ticketLink;
  const onMe = req.body.onMe;
  const image = req.file.filename;
  const tags = JSON.parse(req.body.tags);
  const numRequests = 0;

  const newEvent = new UserEventsModel({
    creator: creator,
    creator_ref: creator_ref,
    title: title,
    date: date,
    location: location,
    price: price,
    description: description,
    ticketLink: ticketLink,
    onMe: onMe,
    image: image,
    tags: tags,
    numRequests: numRequests
  });

  newEvent
    .save()
    .then(() => res.json("User Event added!"))
    .catch((err) => res.status(400).json("Couldn't create user: " + err));
});

// this one was messing with the :email one, not sure why. It isn't used
// router.route("/userevents/:eventID").get(async (req, res) => {
//     const userEventDoc = await UserEventsModel.find({
//       eventID: req.params.eventID,
//     });
//     res.send(userEventDoc);
// });
router.route("/userevents/:email").get(async (req, res) => {
  console.log(req.params.email);
  const userEventDoc = await UserEventsModel.find({
    creator: req.params.email,
  }).populate(["creator"]);
  // console.log(userEventDoc);
  res.send(userEventDoc);
});

router.route("/myevent/:creator").get(async (req, res) => {
    try {
      const event = await UserEventsModel.find({
        creator: req.params.creator,
      }).populate(["creator"]);
      res.send(event);
    } catch {
      res.status(404);
      res.send({ error: "Event does not exist" });
    }
});


/* 
  - DEV-CGP-9
  - Get list of events
  - Retrieved events should match all tags given in query array
*/
router.route("/tags/userevents").post( async (req, res) => {
  const queryTags = req.body.queryTags;
  try {
      const event = await UserEventsModel.find({ tags: { $all: queryTags} }).populate(["creator"]);
      res.send(event);
  } catch {
      res.status(404);
      res.send({ error: "No events found matching query tags" });
  }
});


// Quiz 4
router.route("/userevents/numRequests").post( async(req, res) => {
  console.log("POST request is made");

  const userEventID = req.body._id;

  try{
    let userEvent = await UserEventsModel.findOne({ _id: userEventID });
    userEvent.numRequests = req.body.numRequests; // Storing numRequests in db for specific event
    
    await userEvent.save();
    res.send(userEvent);
  } catch (err) {
    console.log(err);
    res.status(404);
    res.send(err);
  }
});

/* 
  - DEV-CGP-23
  - DELETE request
 */
router.route("/delete/:_id").delete( async (req, res) => {
  UserEventsModel.deleteOne({ _id: req.params._id })
  .then(r => res.status(203).json(r))
  .catch(err => res.json({ err: err }));
})

/*
  - DEV-CGP-23
  - edit fields of event (not image)
 */
router.route("/edit-content/:_id").post( (req, res) => {
  UserEventsModel.findOne({ _id: req.params._id })
  .then( e => {
    e.title = req.body.title;
    e.date = req.body.date;
    e.location = req.body.location;
    e.price = req.body.price;
    e.ticketLink = req.body.link;
    e.onMe = req.body.onMe;
    e.description = req.body.description;
    e.tags = req.body.tags;
    e.save().then(r => res.json(r)).catch(err => console.log(err));
  }).catch(err => console.log(err))
})

/*
  - DEV-CGP-23
  - edit profile picture
*/
router.route("/image/:_id").post(upload.single("eventPic"), async(req, res) => {
  console.log("At least the request is made");
  console.log(req.file);
  console.log(req.file.filename);

  try{
    let event = await UserEventsModel.findOne({ _id: req.params._id });
    event.image = req.file.filename; // Storing image file name in db for specific user
    
    await event.save();
    res.send(event);
  } catch (err) {
    console.log(err);
    res.status(404);
    res.send(err);
  }
});
module.exports = router;