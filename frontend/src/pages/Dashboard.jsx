import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaLeaf,
    FaSeedling,
    FaCheckCircle
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

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {

            navigate("/login");
            return;

        }

        fetchProfile();
        fetchCropStatistics();

    }, [navigate]);

    const fetchProfile = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/auth/profile", {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            });

            setUser(response.data);

        }

        catch (error) {

            localStorage.removeItem("token");

            navigate("/login");

        }

    };

    const fetchCropStatistics = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/crops", {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            });

            const crops = response.data;

            setCrops(crops);

            setCropCount(crops.length);

            setGrowingCount(

                crops.filter(

                    crop => crop.status === "Growing"

                ).length

            );

            setHarvestedCount(

                crops.filter(

                    crop => crop.status === "Harvested"

                ).length

            );

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <>

            <Navbar />

            <div className="dashboard-page">

                {/* Welcome Banner */}

                <div className="welcome-card">

                    <h1>

                        👋 Welcome, {user.fullName}

                    </h1>

                    <p>

                        Manage your farm efficiently using Smart Agriculture.

                    </p>

                </div>

                {/* Statistics */}

                <div className="stats">

                    <div className="stat-card">

                        <FaLeaf
                            size={42}
                            color="#2E7D32"
                        />

                        <h2>{cropCount}</h2>

                        <p>Total Crops</p>

                    </div>

                    <div className="stat-card">

                        <FaSeedling
                            size={42}
                            color="#2E7D32"
                        />

                        <h2>{growingCount}</h2>

                        <p>Growing Crops</p>

                    </div>

                    <div className="stat-card">

                        <FaCheckCircle
                            size={42}
                            color="#2E7D32"
                        />

                        <h2>{harvestedCount}</h2>

                        <p>Harvested Crops</p>

                    </div>

                </div>

                {/* Weather */}

                <div style={{ marginBottom: "30px" }}>

                    <WeatherCard />

                </div>

                {/* Crop Chart */}

                <CropChart crops={crops} />

                {/* Farmer Details */}

                <div className="profile-card">

                    <h2>

                        👤 Farmer Information

                    </h2>

                    <div className="profile-grid">

                        <div className="info-box">

                            <strong>Full Name</strong>

                            {user.fullName}

                        </div>

                        <div className="info-box">

                            <strong>Email</strong>

                            {user.email}

                        </div>

                        <div className="info-box">

                            <strong>Mobile</strong>

                            {user.mobile}

                        </div>

                        <div className="info-box">

                            <strong>State</strong>

                            {user.state}

                        </div>

                        <div className="info-box">

                            <strong>District</strong>

                            {user.district}

                        </div>

                        <div className="info-box">

                            <strong>Village</strong>

                            {user.village}

                        </div>

                        <div className="info-box">

                            <strong>Land Area</strong>

                            {user.landArea} Acres

                        </div>

                        <div className="info-box">

                            <strong>Primary Crop</strong>

                            {user.primaryCrop}

                        </div>

                    </div>

                </div>

                {/* Buttons */}

                <div className="action-buttons">

                    <button
                        onClick={() => navigate("/add-crop")}
                    >
                        🌱 Add Crop
                    </button>

                    <button
                        onClick={() => navigate("/crops")}
                    >
                        📋 View Crops
                    </button>

                </div>

            </div>

        </>

    );

}

export default Dashboard;