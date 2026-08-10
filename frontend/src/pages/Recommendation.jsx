import { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import "../styles/recommendation.css";


function Recommendation() {

    const [formData, setFormData] = useState({

        season: "",
        state: "",
        rainfall: "",
        soilType: ""

    });


    const [recommendations, setRecommendations] = useState([]);


    // =====================================================
    // Handle Input Changes
    // =====================================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };


    // =====================================================
    // Generate Recommendations
    // =====================================================

    const getRecommendations = () => {

        const {
            season,
            state,
            rainfall,
            soilType
        } = formData;


        if (!season) {

            toast.error("Please select a season");

            return;

        }


        if (!state) {

            toast.error("Please select a state");

            return;

        }


        if (!rainfall) {

            toast.error("Please enter annual rainfall");

            return;

        }


        if (!soilType) {

            toast.error("Please select soil type");

            return;

        }


        const rain = Number(rainfall);

        let crops = [];


        // =================================================
        // Kharif
        // =================================================

        if (season === "Kharif") {

            if (
                soilType === "Alluvial" ||
                soilType === "Clay"
            ) {

                crops.push(
                    "Rice",
                    "Maize",
                    "Cotton"
                );

            }

            else {

                crops.push(
                    "Groundnut",
                    "Millets",
                    "Soybean"
                );

            }

        }


        // =================================================
        // Rabi
        // =================================================

        else if (season === "Rabi") {

            if (
                soilType === "Alluvial" ||
                soilType === "Loamy"
            ) {

                crops.push(
                    "Wheat",
                    "Barley",
                    "Gram"
                );

            }

            else {

                crops.push(
                    "Mustard",
                    "Chickpea",
                    "Lentil"
                );

            }

        }


        // =================================================
        // Summer
        // =================================================

        else if (season === "Summer") {

            crops.push(
                "Watermelon",
                "Muskmelon",
                "Vegetables"
            );

        }


        // =================================================
        // Autumn
        // =================================================

        else if (season === "Autumn") {

            crops.push(
                "Rice",
                "Maize",
                "Vegetables"
            );

        }


        // =================================================
        // Winter
        // =================================================

        else if (season === "Winter") {

            crops.push(
                "Wheat",
                "Barley",
                "Mustard"
            );

        }


        // =================================================
        // Whole Year
        // =================================================

        else if (season === "Whole Year") {

            crops.push(
                "Coconut",
                "Arecanut",
                "Banana"
            );

        }


        // =================================================
        // Rainfall Adjustment
        // =================================================

        if (rain < 600) {

            crops = crops.filter(
                crop =>
                    crop !== "Rice" &&
                    crop !== "Watermelon"
            );

            crops.push(
                "Millets",
                "Groundnut"
            );

        }


        else if (rain > 1500) {

            crops.unshift(
                "Rice"
            );

        }


        // =================================================
        // Remove Duplicate Crops
        // =================================================

        crops = [...new Set(crops)];


        // =================================================
        // Limit Recommendations
        // =================================================

        crops = crops.slice(0, 5);


        setRecommendations(crops);

        toast.success(
            "Crop recommendations generated!"
        );

    };


    return (

        <>

            <Navbar />


            <div className="recommendation-page">


                {/* ========================================= */}
                {/* Header */}
                {/* ========================================= */}

                <div className="recommendation-card">


                    <h1>

                        🌱 Crop Recommendations

                    </h1>


                    <p>

                        Get suitable crop suggestions based on
                        your season, location, rainfall and soil.

                    </p>


                    {/* ===================================== */}
                    {/* Form */}
                    {/* ===================================== */}

                    <div className="recommendation-form">


                        {/* Season */}

                        <div className="recommendation-group">

                            <label>

                                📅 Season

                            </label>


                            <select
                                name="season"
                                value={formData.season}
                                onChange={handleChange}
                            >

                                <option value="">

                                    Select Season

                                </option>

                                <option value="Whole Year">

                                    Whole Year

                                </option>

                                <option value="Kharif">

                                    Kharif

                                </option>

                                <option value="Rabi">

                                    Rabi

                                </option>

                                <option value="Autumn">

                                    Autumn

                                </option>

                                <option value="Summer">

                                    Summer

                                </option>

                                <option value="Winter">

                                    Winter

                                </option>

                            </select>

                        </div>


                        {/* State */}

                        <div className="recommendation-group">

                            <label>

                                🗺️ State

                            </label>


                            <select
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                            >

                                <option value="">

                                    Select State

                                </option>

                                <option value="Andhra Pradesh">
                                    Andhra Pradesh
                                </option>

                                <option value="Arunachal Pradesh">
                                    Arunachal Pradesh
                                </option>

                                <option value="Assam">
                                    Assam
                                </option>

                                <option value="Bihar">
                                    Bihar
                                </option>

                                <option value="Chhattisgarh">
                                    Chhattisgarh
                                </option>

                                <option value="Delhi">
                                    Delhi
                                </option>

                                <option value="Goa">
                                    Goa
                                </option>

                                <option value="Gujarat">
                                    Gujarat
                                </option>

                                <option value="Haryana">
                                    Haryana
                                </option>

                                <option value="Himachal Pradesh">
                                    Himachal Pradesh
                                </option>

                                <option value="Jharkhand">
                                    Jharkhand
                                </option>

                                <option value="Karnataka">
                                    Karnataka
                                </option>

                                <option value="Kerala">
                                    Kerala
                                </option>

                                <option value="Madhya Pradesh">
                                    Madhya Pradesh
                                </option>

                                <option value="Maharashtra">
                                    Maharashtra
                                </option>

                                <option value="Manipur">
                                    Manipur
                                </option>

                                <option value="Meghalaya">
                                    Meghalaya
                                </option>

                                <option value="Mizoram">
                                    Mizoram
                                </option>

                                <option value="Nagaland">
                                    Nagaland
                                </option>

                                <option value="Odisha">
                                    Odisha
                                </option>

                                <option value="Punjab">
                                    Punjab
                                </option>

                                <option value="Rajasthan">
                                    Rajasthan
                                </option>

                                <option value="Sikkim">
                                    Sikkim
                                </option>

                                <option value="Tamil Nadu">
                                    Tamil Nadu
                                </option>

                                <option value="Telangana">
                                    Telangana
                                </option>

                                <option value="Tripura">
                                    Tripura
                                </option>

                                <option value="Uttar Pradesh">
                                    Uttar Pradesh
                                </option>

                                <option value="Uttarakhand">
                                    Uttarakhand
                                </option>

                                <option value="West Bengal">
                                    West Bengal
                                </option>

                            </select>

                        </div>


                        {/* Rainfall */}

                        <div className="recommendation-group">

                            <label>

                                🌧️ Annual Rainfall (mm)

                            </label>


                            <input
                                type="number"
                                name="rainfall"
                                value={formData.rainfall}
                                onChange={handleChange}
                                placeholder="Example: 800"
                                min="0"
                                step="0.01"
                            />

                        </div>


                        {/* Soil */}

                        <div className="recommendation-group">

                            <label>

                                🌍 Soil Type

                            </label>


                            <select
                                name="soilType"
                                value={formData.soilType}
                                onChange={handleChange}
                            >

                                <option value="">

                                    Select Soil Type

                                </option>

                                <option value="Alluvial">

                                    Alluvial

                                </option>

                                <option value="Black">

                                    Black

                                </option>

                                <option value="Red">

                                    Red

                                </option>

                                <option value="Loamy">

                                    Loamy

                                </option>

                                <option value="Clay">

                                    Clay

                                </option>

                                <option value="Sandy">

                                    Sandy

                                </option>

                            </select>

                        </div>

                    </div>


                    {/* ===================================== */}
                    {/* Recommendation Button */}
                    {/* ===================================== */}

                    <button
                        className="recommend-btn"
                        onClick={getRecommendations}
                    >

                        🤖 Get Crop Recommendations

                    </button>


                </div>


                {/* ========================================= */}
                {/* Results */}
                {/* ========================================= */}

                {recommendations.length > 0 && (

                    <div className="recommendation-results">


                        <h2>

                            🌾 Recommended Crops

                        </h2>


                        <p>

                            Based on your selected conditions,
                            these crops may be suitable:

                        </p>


                        <div className="recommendation-grid">


                            {recommendations.map(
                                (crop, index) => (

                                    <div
                                        className="recommendation-item"
                                        key={index}
                                    >

                                        <div className="crop-icon">

                                            🌱

                                        </div>


                                        <h3>

                                            {crop}

                                        </h3>


                                        <span>

                                            Recommended

                                        </span>

                                    </div>

                                )
                            )}

                        </div>

                    </div>

                )}

            </div>

        </>

    );

}


export default Recommendation;