const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    eventID: {
        type: String,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Creator info is required'],
        ref: 'user-details',
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
    ticketLink: {
        type: String,
        required: false,
    },
    onMe: {
        type: Boolean,
        required: false,
    },
    image: {
        type: String,
    },
    // For DEV-CGP-9
    tags: {
        type: [String],
        required: true,
    }
});

const UserEventsModel = mongoose.model("userevents", eventSchema);
module.exports = UserEventsModel;