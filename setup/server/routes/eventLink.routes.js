const router = require("express").Router();
let EventLinkModel = require("../models/eventLink.model");

// Get all eventLink documents
router.route("/eventLink").get(async (req, res) => {
    const eventLinkDocs = await EventLinkModel.find();
    res.send(eventLinkDocs);
});

// Get eventLink document of one user
router.route("/eventLink/:email").get(async (req, res) => {
    const eventLinkDoc = await EventLinkModel.find({
      email: req.params.email,
    });
    res.send(eventLinkDoc);
});

// Post an eventLink
router.route("/eventLink").post(async (req, res) => {
    console.log("made it in baby");
    const eventLinkList = req.body.eventList;
    const email = req.body.email;

    const newEventLinkDoc = new EventLinkModel({
        eventList: eventLinkList,
        email: email,
    });

    const currentDatabaseLinks = await EventLinkModel.find({
        email: email,
    });

    if (currentDatabaseLinks.length === 0) {
        await newEventLinkDoc.save();
        console.log("event link document posted");
        res.send(newEventLinkDoc);
    } else {
        console.log("Event link already exists in database");
    }
});

// Delete the eventLink document of a particular user
router.route("/eventLink/:email").delete(async (req, res) => {
    try {
        await EventLinkModel.deleteOne({ email: req.params.email });
        console.log("event link document deleted");
        res.status(204).send();
    } catch {
        console.log("This event link document does not exist");
    }
});

module.exports = router;