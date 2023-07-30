const mongoose = require('mongoose');

const emailAuth = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email address is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: 'Password is required',
        minLength: [8, 'Password too short'],
    },
    username: {
        type: String,
        trim: true,
        required: [true, 'Username is required'],
        minLength: [2, 'Username too short'],
    },
    isBusiness: {
        type: Boolean,
        default: false,
    },
    
})

const EmailAuthModel = mongoose.model("email-auth", emailAuth);
module.exports = EmailAuthModel;