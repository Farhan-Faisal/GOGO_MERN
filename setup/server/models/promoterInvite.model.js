const mongoose = require('mongoose');

//Invite send by promoter to a user, inviting the user to join a specific event. 
const promoterInvite = new mongoose.Schema({
    invitee: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'invitee info is required'],
        ref: 'user-details',
    },
    promoter: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'promoter info is required'],
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

const PromoterInviteModel = mongoose.model("promoter-invite", promoterInvite);
module.exports = PromoterInviteModel;