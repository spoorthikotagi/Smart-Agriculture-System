import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import api from "../services/api";
import "../styles/addCrop.css";

function AddCrop() {

    const navigate = useNavigate();

    // =====================================================
    // Crop Form Data
    // =====================================================

    const [formData, setFormData] = useState({
        cropName: "",
        season: "",
        area: "",
        sowingDate: "",
        expectedHarvestDate: "",
        status: "Planned"
    });


    // =====================================================
    // ML Prediction Data
    // =====================================================

    const [mlData, setMlData] = useState({
        cropYear: new Date().getFullYear(),
        state: "",
        annualRainfall: "",
        fertilizer: "",
        pesticide: ""
    });


    // =====================================================
    // Prediction State
    // =====================================================

    const [predictedYield, setPredictedYield] = useState(null);
    const [predicting, setPredicting] = useState(false);


    // =====================================================
    // Handle Crop Form Changes
    // =====================================================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    // =====================================================
    // Handle ML Form Changes
    // =====================================================

    const handleMlChange = (e) => {

        setMlData({
            ...mlData,
            [e.target.name]: e.target.value
        });

    };


    // =====================================================
    // Predict Crop Yield
    // =====================================================

    const handlePredictYield = async () => {

        if (!formData.cropName) {

            toast.error("Please enter the crop name");

            return;

        }

        if (!formData.season) {

            toast.error("Please select a season");

            return;

        }

        if (!formData.area) {

            toast.error("Please enter land area");

            return;

        }

        if (!mlData.state) {

            toast.error("Please select a state");

            return;

        }

        if (!mlData.annualRainfall) {

            toast.error("Please enter annual rainfall");

            return;

        }

        if (!mlData.fertilizer) {

            toast.error("Please enter fertilizer usage");

            return;

        }

        if (!mlData.pesticide) {

            toast.error("Please enter pesticide usage");

            return;

        }


        try {

            setPredicting(true);

            const token = localStorage.getItem("token");


            const response = await api.post(
                "/crops/predict-yield",
                {
                    Crop: formData.cropName,
                    Crop_Year: Number(mlData.cropYear),
                    Season: formData.season,
                    State: mlData.state,
                    Area: Number(formData.area),
                    Annual_Rainfall: Number(mlData.annualRainfall),
                    Fertilizer: Number(mlData.fertilizer),
                    Pesticide: Number(mlData.pesticide)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            if (response.data.success) {

                setPredictedYield(
                    response.data.predictedYield
                );

                toast.success(
                    "Yield predicted successfully!"
                );

            } else {

                toast.error(
                    "Unable to generate prediction"
                );

            }

        } catch (error) {

            console.error(
                "Prediction Error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Unable to predict crop yield"
            );

        } finally {

            setPredicting(false);

        }

    };


    // =====================================================
    // Add Crop + Save Predicted Yield
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        // Prediction must be generated first

        if (predictedYield === null) {

            toast.error(
                "Please predict the crop yield before adding the crop"
            );

            return;

        }


        try {

            const token = localStorage.getItem("token");


            const response = await api.post(
                "/crops",
                {
                    ...formData,

                    // Save AI prediction
                    predictedYield: Number(predictedYield)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            toast.success(
                response.data.message
            );


            setTimeout(() => {

                navigate("/crops");

            }, 800);


        } catch (error) {

            console.error(
                "Add Crop Error:",
                error
            );


            toast.error(
                error.response?.data?.message ||
                "Unable to Add Crop"
            );

        }

    };


    // =====================================================
    // JSX
    // =====================================================

    return (

        <>

            <Navbar />


            <div className="addcrop-page">

                <div className="addcrop-card">


                    {/* ========================================= */}
                    {/* PAGE HEADING */}
                    {/* ========================================= */}

                    <h1 className="addcrop-title">

                        🌱 Add New Crop

                    </h1>


                    <p className="addcrop-subtitle">

                        Enter your crop details and predict
                        the expected yield

                    </p>


                    <form onSubmit={handleSubmit}>


                        {/* ========================================= */}
                        {/* CROP DETAILS */}
                        {/* ========================================= */}

                        <h2 className="section-title">

                            🌾 Crop Details

                        </h2>


                        <div className="form-grid">


                            {/* Crop Name */}

                            <div className="form-group full-width">

                                <label>

                                    🌾 Crop Name

                                </label>


                                <input
                                    type="text"
                                    name="cropName"
                                    value={formData.cropName}
                                    onChange={handleChange}
                                    placeholder="Example: Rice"
                                    required
                                />

                            </div>


                            {/* Season */}

                            <div className="form-group">

                                <label>

                                    📅 Season

                                </label>


                                <select
                                    name="season"
                                    value={formData.season}
                                    onChange={handleChange}
                                    required
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


                            {/* Area */}

                            <div className="form-group">

                                <label>

                                    📍 Area (Acres)

                                </label>


                                <input
                                    type="number"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleChange}
                                    placeholder="Example: 5"
                                    min="0"
                                    step="0.01"
                                    required
                                />

                            </div>


                            {/* Sowing Date */}

                            <div className="form-group">

                                <label>

                                    🌱 Sowing Date

                                </label>


                                <input
                                    type="date"
                                    name="sowingDate"
                                    value={formData.sowingDate}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* Harvest Date */}

                            <div className="form-group">

                                <label>

                                    🚜 Harvest Date

                                </label>


                                <input
                                    type="date"
                                    name="expectedHarvestDate"
                                    value={formData.expectedHarvestDate}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* Status */}

                            <div className="form-group full-width">

                                <label>

                                    📊 Status

                                </label>


                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >

                                    <option value="Planned">

                                        Planned

                                    </option>


                                    <option value="Growing">

                                        Growing

                                    </option>


                                    <option value="Harvested">

                                        Harvested

                                    </option>

                                </select>

                            </div>

                        </div>


                        {/* ========================================= */}
                        {/* AI YIELD PREDICTION */}
                        {/* ========================================= */}

                        <h2 className="section-title">

                            🤖 AI Yield Prediction

                        </h2>


                        <div className="form-grid">


                            {/* Crop Year */}

                            <div className="form-group">

                                <label>

                                    📆 Crop Year

                                </label>


                                <input
                                    type="number"
                                    name="cropYear"
                                    value={mlData.cropYear}
                                    onChange={handleMlChange}
                                    min="1997"
                                    max="2100"
                                    required
                                />

                            </div>


                            {/* State */}

                            <div className="form-group">

                                <label>

                                    🗺️ State

                                </label>


                                <select
                                    name="state"
                                    value={mlData.state}
                                    onChange={handleMlChange}
                                    required
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

                                    <option value="Jammu and Kashmir">
                                        Jammu and Kashmir
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

                                    <option value="Puducherry">
                                        Puducherry
                                    </option>

                                    <option value="Punjab">
                                        Punjab
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


                            {/* Annual Rainfall */}

                            <div className="form-group">

                                <label>

                                    🌧️ Annual Rainfall (mm)

                                </label>


                                <input
                                    type="number"
                                    name="annualRainfall"
                                    value={mlData.annualRainfall}
                                    onChange={handleMlChange}
                                    placeholder="Example: 800"
                                    min="0"
                                    step="0.01"
                                    required
                                />

                            </div>


                            {/* Fertilizer */}

                            <div className="form-group">

                                <label>

                                    🧪 Fertilizer

                                </label>


                                <input
                                    type="number"
                                    name="fertilizer"
                                    value={mlData.fertilizer}
                                    onChange={handleMlChange}
                                    placeholder="Example: 5000"
                                    min="0"
                                    step="0.01"
                                    required
                                />

                            </div>


                            {/* Pesticide */}

                            <div className="form-group full-width">

                                <label>

                                    🐛 Pesticide

                                </label>


                                <input
                                    type="number"
                                    name="pesticide"
                                    value={mlData.pesticide}
                                    onChange={handleMlChange}
                                    placeholder="Example: 100"
                                    min="0"
                                    step="0.01"
                                    required
                                />

                            </div>

                        </div>


                        {/* ========================================= */}
                        {/* PREDICT BUTTON */}
                        {/* ========================================= */}

                        <button
                            type="button"
                            className="predict-btn"
                            onClick={handlePredictYield}
                            disabled={predicting}
                        >

                            {predicting
                                ? "🤖 Predicting..."
                                : "🤖 Predict Crop Yield"
                            }

                        </button>


                        {/* ========================================= */}
                        {/* PREDICTION RESULT */}
                        {/* ========================================= */}

                        {predictedYield !== null && (

                            <div className="prediction-result">

                                <h2>

                                    🌾 Predicted Yield

                                </h2>


                                <div className="prediction-value">

                                    {Number(predictedYield).toFixed(4)}
                                    {" tonnes/hectare"}

                                </div>


                                <p>

                                    Estimated crop yield based on
                                    the provided agricultural
                                    conditions.

                                </p>

                            </div>

                        )}


                        {/* ========================================= */}
                        {/* ACTION BUTTONS */}
                        {/* ========================================= */}

                        <div className="button-group">

                            <button type="submit">

                                🌱 Add Crop

                            </button>


                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => navigate("/dashboard")}
                            >

                                ← Cancel

                            </button>

                        </div>


                    </form>

                </div>

            </div>

        </>

    );

}

export default AddCrop;