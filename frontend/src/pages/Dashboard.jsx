import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaLeaf,
    FaSeedling,
    FaCheckCircle,
    FaRobot,
    FaCalendarAlt
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import WeatherCard from "../components/WeatherCard";
import CropChart from "../components/CropChart";
import api from "../services/api";
import "../styles/dashboard.css";

function Dashboard() {

    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [cropCount, setCropCount] = useState(0);
    const [growingCount, setGrowingCount] = useState(0);
    const [harvestedCount, setHarvestedCount] = useState(0);
    const [crops, setCrops] = useState([]);


    // =====================================================
    // Load Dashboard Data
    // =====================================================

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {

            navigate("/login");

            return;

        }

        fetchProfile();
        fetchCropStatistics();

    }, [navigate]);


    // =====================================================
    // Fetch Farmer Profile
    // =====================================================

    const fetchProfile = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/auth/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUser(response.data);

        }

        catch (error) {

            console.error(error);

            localStorage.removeItem("token");

            navigate("/login");

        }

    };


    // =====================================================
    // Fetch Crop Statistics
    // =====================================================

    const fetchCropStatistics = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/crops",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const cropData = response.data;

            setCrops(cropData);

            setCropCount(cropData.length);

            setGrowingCount(

                cropData.filter(
                    crop => crop.status === "Growing"
                ).length

            );

            setHarvestedCount(

                cropData.filter(
                    crop => crop.status === "Harvested"
                ).length

            );

        }

        catch (error) {

            console.log(error);

        }

    };


    // =====================================================
    // Crops With AI Predictions
    // =====================================================

    const predictedCrops = crops.filter(

        crop =>
            crop.predictedYield !== null &&
            crop.predictedYield !== undefined

    );


    // =====================================================
    // Upcoming Crop Activities
    // =====================================================

    const upcomingCrops = crops
        .filter(crop => {

            if (!crop.expectedHarvestDate) {
                return false;
            }

            if (crop.status === "Harvested") {
                return false;
            }

            return true;

        })
        .sort(

            (a, b) =>
                new Date(a.expectedHarvestDate) -
                new Date(b.expectedHarvestDate)

        )
        .slice(0, 5);


    // =====================================================
    // Calculate Harvest Information
    // =====================================================

    const getHarvestInfo = (harvestDate) => {

        const today = new Date();

        today.setHours(
            0,
            0,
            0,
            0
        );


        const harvest = new Date(
            harvestDate
        );

        harvest.setHours(
            0,
            0,
            0,
            0
        );


        const difference =
            harvest.getTime() -
            today.getTime();


        const daysRemaining =
            Math.ceil(
                difference /
                (1000 * 60 * 60 * 24)
            );


        return daysRemaining;

    };


    // =====================================================
    // Format Date
    // =====================================================

    const formatDate = (date) => {

        return new Date(
            date
        ).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    // =====================================================
    // JSX
    // =====================================================

    return (

        <>

            <Navbar />


            <div className="dashboard-page">


                {/* ========================================= */}
                {/* Welcome Banner */}
                {/* ========================================= */}

                <div className="welcome-card">

                    <h1>

                        👋 Welcome, {user.fullName}

                    </h1>

                    <p>

                        Manage your farm efficiently using
                        Smart Agriculture.

                    </p>

                </div>


                {/* ========================================= */}
                {/* Statistics */}
                {/* ========================================= */}

                <div className="stats">


                    <div className="stat-card">

                        <FaLeaf
                            size={42}
                            color="#2E7D32"
                        />

                        <h2>
                            {cropCount}
                        </h2>

                        <p>
                            Total Crops
                        </p>

                    </div>


                    <div className="stat-card">

                        <FaSeedling
                            size={42}
                            color="#2E7D32"
                        />

                        <h2>
                            {growingCount}
                        </h2>

                        <p>
                            Growing Crops
                        </p>

                    </div>


                    <div className="stat-card">

                        <FaCheckCircle
                            size={42}
                            color="#2E7D32"
                        />

                        <h2>
                            {harvestedCount}
                        </h2>

                        <p>
                            Harvested Crops
                        </p>

                    </div>

                </div>


                {/* ========================================= */}
                {/* Weather */}
                {/* ========================================= */}

                <div
                    style={{
                        marginBottom: "30px"
                    }}
                >

                    <WeatherCard />

                </div>


                {/* ========================================= */}
                {/* Crop Chart */}
                {/* ========================================= */}

                <CropChart
                    crops={crops}
                />


                {/* ========================================= */}
                {/* AI Yield Predictions */}
                {/* ========================================= */}

                <div className="ai-prediction-card">


                    <div className="ai-prediction-header">

                        <div>

                            <h2>

                                <FaRobot />

                                {" "}AI Yield Predictions

                            </h2>

                            <p>

                                Crop yield predictions generated
                                using the XGBoost model.

                            </p>

                        </div>


                        <button
                            onClick={() =>
                                navigate("/crops")
                            }
                        >

                            View All Crops

                        </button>

                    </div>


                    {predictedCrops.length > 0 ? (

                        <div className="prediction-grid">

                            {predictedCrops.map(
                                (crop) => (

                                    <div
                                        className="prediction-card"
                                        key={crop._id}
                                    >

                                        <div className="prediction-card-icon">

                                            🌾

                                        </div>


                                        <div className="prediction-card-content">

                                            <h3>

                                                {crop.cropName}

                                            </h3>


                                            <p>

                                                {crop.season}

                                                {" • "}

                                                {crop.area} Acres

                                            </p>


                                            <div className="dashboard-yield">

                                                <span>

                                                    Predicted Yield

                                                </span>


                                                <strong>

                                                    {Number(
                                                        crop.predictedYield
                                                    ).toFixed(4)}

                                                    {" tonnes/hectare"}

                                                </strong>

                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    ) : (

                        <div className="no-predictions">

                            <div>

                                🤖

                            </div>

                            <h3>

                                No AI Predictions Yet

                            </h3>

                            <p>

                                Add a crop and generate an AI
                                yield prediction to see it here.

                            </p>


                            <button
                                onClick={() =>
                                    navigate("/add-crop")
                                }
                            >

                                🌱 Add Crop & Predict Yield

                            </button>

                        </div>

                    )}

                </div>


                {/* ========================================= */}
                {/* Upcoming Crop Activities */}
                {/* ========================================= */}

                <div className="activities-card">


                    <div className="activities-header">

                        <div>

                            <h2>

                                <FaCalendarAlt />

                                {" "}Upcoming Crop Activities

                            </h2>

                            <p>

                                Keep track of your expected
                                harvest dates.

                            </p>

                        </div>


                        <button
                            onClick={() =>
                                navigate("/crops")
                            }
                        >

                            View My Crops

                        </button>

                    </div>


                    {upcomingCrops.length > 0 ? (

                        <div className="activities-list">

                            {upcomingCrops.map(
                                (crop) => {

                                    const daysRemaining =
                                        getHarvestInfo(
                                            crop.expectedHarvestDate
                                        );


                                    return (

                                        <div
                                            className="activity-item"
                                            key={crop._id}
                                        >


                                            <div className="activity-icon">

                                                🚜

                                            </div>


                                            <div className="activity-content">

                                                <h3>

                                                    {crop.cropName}

                                                </h3>


                                                <p>

                                                    {crop.season}

                                                    {" • "}

                                                    {crop.area} Acres

                                                </p>


                                                <span>

                                                    📅 Expected Harvest:

                                                    {" "}

                                                    {formatDate(
                                                        crop.expectedHarvestDate
                                                    )}

                                                </span>

                                            </div>


                                            <div
                                                className={
                                                    daysRemaining < 0
                                                        ? "harvest-status overdue"
                                                        : daysRemaining <= 7
                                                            ? "harvest-status urgent"
                                                            : "harvest-status upcoming"
                                                }
                                            >

                                                {daysRemaining < 0

                                                    ?

                                                    `⚠️ ${Math.abs(
                                                        daysRemaining
                                                    )} days overdue`

                                                    :

                                                    daysRemaining === 0

                                                        ?

                                                        "🚜 Harvest Today!"

                                                        :

                                                        daysRemaining === 1

                                                            ?

                                                            "🚜 Harvest Tomorrow"

                                                            :

                                                            `🚜 Harvest in ${daysRemaining} days`

                                                }

                                            </div>


                                        </div>

                                    );

                                }
                            )}

                        </div>

                    ) : (

                        <div className="no-activities">

                            <div>

                                📅

                            </div>

                            <h3>

                                No Upcoming Activities

                            </h3>

                            <p>

                                Add a crop with an expected
                                harvest date to see reminders here.

                            </p>


                        </div>

                    )}

                </div>


                {/* ========================================= */}
                {/* Farmer Details */}
                {/* ========================================= */}

                <div className="profile-card">

                    <h2>

                        👤 Farmer Information

                    </h2>


                    <div className="profile-grid">


                        <div className="info-box">

                            <strong>
                                Full Name
                            </strong>

                            {user.fullName}

                        </div>


                        <div className="info-box">

                            <strong>
                                Email
                            </strong>

                            {user.email}

                        </div>


                        <div className="info-box">

                            <strong>
                                Mobile
                            </strong>

                            {user.mobile}

                        </div>


                        <div className="info-box">

                            <strong>
                                State
                            </strong>

                            {user.state}

                        </div>


                        <div className="info-box">

                            <strong>
                                District
                            </strong>

                            {user.district}

                        </div>


                        <div className="info-box">

                            <strong>
                                Village
                            </strong>

                            {user.village}

                        </div>


                        <div className="info-box">

                            <strong>
                                Land Area
                            </strong>

                            {user.landArea} Acres

                        </div>


                        <div className="info-box">

                            <strong>
                                Primary Crop
                            </strong>

                            {user.primaryCrop}

                        </div>

                    </div>

                </div>


                {/* ========================================= */}
                {/* Buttons */}
                {/* ========================================= */}

                <div className="action-buttons">


                    <button
                        onClick={() =>
                            navigate("/add-crop")
                        }
                    >

                        🌱 Add Crop

                    </button>


                    <button
                        onClick={() =>
                            navigate("/crops")
                        }
                    >

                        📋 View Crops

                    </button>

                </div>


            </div>

        </>

    );

}


export default Dashboard;