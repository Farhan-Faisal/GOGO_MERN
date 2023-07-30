const mongoose = require('mongoose');

const promoterRequest = new mongoose.Schema({
    requestee: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Requestee info is required'],
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
    event: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Event info is required'],
        ref: 'userevents',
    }
})

const PromoterRequestModel = mongoose.model("promoter-requests", promoterRequest);
module.exports = PromoterRequestModel;