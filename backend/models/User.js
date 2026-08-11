const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {

        // =====================================================
        // Full Name
        // =====================================================

        fullName: {

            type: String,

            required: true,

            trim: true

        },


        // =====================================================
        // Email
        // =====================================================

        email: {

            type: String,

            required: true,

            unique: true,

            lowercase: true,

            trim: true

        },


        // =====================================================
        // Mobile Number
        // =====================================================

        mobile: {

            type: String,

            required: true,

            unique: true,

            trim: true

        },


        // =====================================================
        // Password
        // =====================================================

        password: {

            type: String,

            required: true

        },


        // =====================================================
        // State
        // =====================================================

        state: {

            type: String,

            required: true,

            trim: true

        },


        // =====================================================
        // District
        // =====================================================

        district: {

            type: String,

            required: true,

            trim: true

        },


        // =====================================================
        // Village
        // =====================================================

        village: {

            type: String,

            required: true,

            trim: true

        },


        // =====================================================
        // Land Area
        // =====================================================

        landArea: {

            type: Number,

            required: true,

            min: 0.01

        },


        // =====================================================
        // Primary Crop
        // =====================================================

        primaryCrop: {

            type: String,

            required: true,

            trim: true

        },


        // =====================================================
        // Role
        // =====================================================

        role: {

            type: String,

            enum: ["Farmer", "Admin"],

            default: "Farmer"

        }

    },

    {

        timestamps: true

    }
);


module.exports = mongoose.model(
    "User",
    userSchema
);