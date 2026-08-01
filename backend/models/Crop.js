const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema(
    {
        cropName: {
            type: String,
            required: true,
            trim: true
        },

        season: {
            type: String,
            required: true,
            enum: ["Kharif", "Rabi", "Zaid"]
        },

        area: {
            type: Number,
            required: true
        },

        sowingDate: {
            type: Date,
            required: true
        },

        expectedHarvestDate: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: ["Planned", "Growing", "Harvested"],
            default: "Planned"
        },

        farmer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Crop", cropSchema);