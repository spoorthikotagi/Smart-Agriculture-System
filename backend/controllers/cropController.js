const Crop = require("../models/Crop");
const axios = require("axios");


// =====================================================
// Add Crop
// =====================================================

const addCrop = async (req, res) => {

    try {

        const {
            cropName,
            season,
            area,
            sowingDate,
            expectedHarvestDate,
            status,
            predictedYield
        } = req.body;


        const crop = new Crop({

            cropName,
            season,
            area,
            sowingDate,
            expectedHarvestDate,
            status,
            predictedYield,
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


// =====================================================
// Get All Crops of Logged-in Farmer
// =====================================================

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


// =====================================================
// Update Crop
// =====================================================

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


// =====================================================
// Delete Crop
// =====================================================

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


// =====================================================
// ML - Predict Crop Yield
// =====================================================

const predictYield = async (req, res) => {

    try {

        const {
            Crop,
            Crop_Year,
            Season,
            State,
            Area,
            Annual_Rainfall,
            Fertilizer,
            Pesticide
        } = req.body;


        // ---------------------------------------------
        // Send data to Python ML API
        // ---------------------------------------------

        const response = await axios.post(

            "http://localhost:5001/predict",

            {
                Crop,
                Crop_Year,
                Season,
                State,
                Area,
                Annual_Rainfall,
                Fertilizer,
                Pesticide
            }

        );


        // ---------------------------------------------
        // Return prediction to React
        // ---------------------------------------------

        return res.status(200).json({

            success: true,

            predictedYield:
                response.data.predictedYield

        });


    } catch (error) {

        console.error(

            "ML Prediction Error:",

            error.message

        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to generate crop yield prediction"

        });

    }

};


// =====================================================
// Export Controllers
// =====================================================

module.exports = {

    addCrop,

    getMyCrops,

    updateCrop,

    deleteCrop,

    predictYield

};