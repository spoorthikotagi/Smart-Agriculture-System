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

    }

    catch (error) {

        console.error(
            "Add Crop Error:",
            error
        );


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

    }

    catch (error) {

        console.error(
            "Get Crops Error:",
            error
        );


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
                new: true,

                runValidators: true
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

    }

    catch (error) {

        console.error(
            "Update Crop Error:",
            error
        );


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

    }

    catch (error) {

        console.error(
            "Delete Crop Error:",
            error
        );


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
        // Validate Required Fields
        // ---------------------------------------------

        const requiredFields = {

            Crop,
            Crop_Year,
            Season,
            State,
            Area,
            Annual_Rainfall,
            Fertilizer,
            Pesticide

        };


        for (const [field, value] of Object.entries(
            requiredFields
        )) {

            if (
                value === undefined ||
                value === null ||
                value === ""
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        `${field} is required`

                });

            }

        }


        // ---------------------------------------------
        // ML Service URL
        // ---------------------------------------------

        const ML_SERVICE_URL =
            process.env.ML_SERVICE_URL ||
            "https://smart-agriculture-ml-205h.onrender.com";


        // ---------------------------------------------
        // Send Data to Python ML API
        // ---------------------------------------------

        const response = await axios.post(

            `${ML_SERVICE_URL}/predict`,

            {

                Crop,
                Crop_Year,
                Season,
                State,
                Area,
                Annual_Rainfall,
                Fertilizer,
                Pesticide

            },

            {

                timeout: 60000

            }

        );


        // ---------------------------------------------
        // Check ML Response
        // ---------------------------------------------

        if (
            !response.data ||
            response.data.success !== true
        ) {

            return res.status(500).json({

                success: false,

                message:
                    response.data?.message ||
                    "ML service failed to generate prediction"

            });

        }


        // ---------------------------------------------
        // Return Prediction to React
        // ---------------------------------------------

        return res.status(200).json({

            success: true,

            predictedYield:
                response.data.predictedYield

        });

    }

    catch (error) {

        console.error(
            "ML Prediction Error:",
            error.message
        );


        if (error.response) {

            console.error(
                "ML Service Response:",
                error.response.data
            );

        }


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