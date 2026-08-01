const Crop = require("../models/Crop");

// Add Crop
const addCrop = async (req, res) => {
    try {

        const {
            cropName,
            season,
            area,
            sowingDate,
            expectedHarvestDate,
            status
        } = req.body;

        const crop = new Crop({
            cropName,
            season,
            area,
            sowingDate,
            expectedHarvestDate,
            status,
            farmer: req.user.id
        });

        await crop.save();

        return res.status(201).json({
            message: "Crop added successfully",
            crop
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }
};

// Get All Crops of Logged-in Farmer
const getMyCrops = async (req, res) => {
    try {

        const crops = await Crop.find({
            farmer: req.user.id
        });

        return res.status(200).json(crops);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }
};

// Update Crop
const updateCrop = async (req, res) => {
    try {

        const crop = await Crop.findOneAndUpdate(
            {
                _id: req.params.id,
                farmer: req.user.id
            },
            req.body,
            {
                new: true
            }
        );

        if (!crop) {
            return res.status(404).json({
                message: "Crop not found"
            });
        }

        return res.status(200).json({
            message: "Crop updated successfully",
            crop
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }
};

// Delete Crop
const deleteCrop = async (req, res) => {
    try {

        const crop = await Crop.findOneAndDelete({
            _id: req.params.id,
            farmer: req.user.id
        });

        if (!crop) {
            return res.status(404).json({
                message: "Crop not found"
            });
        }

        return res.status(200).json({
            message: "Crop deleted successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }
};

module.exports = {
    addCrop,
    getMyCrops,
    updateCrop,
    deleteCrop
};