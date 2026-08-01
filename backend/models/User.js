const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    mobile: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true,
        trim: true
    },

    district: {
        type: String,
        required: true,
        trim: true
    },

    village: {
        type: String,
        required: true,
        trim: true
    },

    landArea: {
        type: Number,
        required: true,
        min: 0
    },

    primaryCrop: {
        type: String,
        required: true,
        trim: true
    },

    role: {
        type: String,
        enum: ["Farmer", "Admin"],
        default: "Farmer"
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);