const mongoose = require("mongoose");

const userDetails = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email address is required"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    username: {
        type: String,
        trim: true,
        required: [true, "Username is required"],
        minLength: [2, "Username too short"],
    },
    token: {
        type: String,
        default: null,
    },
    age: {
        type: Number,
        min: 18,
        required: [true, "Age is required"],
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: {
            values: ["male", "female", "other", "secret"],
            message: "invalid gender",
        },
        default: "secret",
    },
    biography: {
        type: String,
        trim: true,
    },
    image: {
        // data: Buffer,
        // contentType: String,
        type: String,
    },
});

const UserDetailsModel = mongoose.model("user-details", userDetails);
module.exports = UserDetailsModel;
