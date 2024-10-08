const mongoose = require('mongoose');

const request = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Requester info is required'],
        ref: 'user-details',
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
        enum: {
            values: ['pending', 'accepted', 'rejected'],
            message: 'invalid status',
        },
        default: 'pending',
    },
    requestee: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Requestee info is required'],
        ref: 'user-details',
    }
})

const RequestModel = mongoose.model("requests", request);
module.exports = RequestModel;