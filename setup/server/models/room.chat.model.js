const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    participantsUsernames: {
        type: [String],
        required: true,
        maxItems: 2
    },
    participants: {
        type: [String],
        required: true,
        maxItems: 2
    },
    roomID:{
        type: String,
        required: true,
        unique: true,
    },
    chatHistory: {
        type: Array,
        default: [],
        required: true,
    },
});

const RoomModel = mongoose.model("chatrooms", roomSchema);
module.exports = RoomModel;