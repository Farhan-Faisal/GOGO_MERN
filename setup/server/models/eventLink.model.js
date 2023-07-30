const mongoose = require("mongoose");

const eventLinkSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true,
        minlength: 2,
    },
    eventList:{
        type: [String],
        required: true,
    },
});

const EventsLinkModel = mongoose.model("eventslinkmodel", eventLinkSchema);
module.exports = EventsLinkModel;