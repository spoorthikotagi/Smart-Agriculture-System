import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import api from "../services/api";
import "../styles/addCrop.css";

function AddCrop() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        cropName: "",
        season: "",
        area: "",
        sowingDate: "",
        expectedHarvestDate: "",
        status: "Planned"
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const response = await api.post(
                "/crops",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success(response.data.message);

            setTimeout(() => {

                navigate("/crops");

            }, 800);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to Add Crop"
            );

        }

    };

    return (

        <>
            <Navbar />

            <div className="addcrop-page">

                <div className="addcrop-card">

                    <h1 className="addcrop-title">
                        🌱 Add New Crop
                    </h1>

                    <p className="addcrop-subtitle">
                        Enter your crop details below
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="form-grid">

                            <div className="form-group full-width">

                                <label>🌾 Crop Name</label>

                                <input
                                    type="text"
                                    name="cropName"
                                    value={formData.cropName}
                                    onChange={handleChange}
                                    placeholder="Enter Crop Name"
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>📅 Season</label>

                                <select
                                    name="season"
                                    value={formData.season}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Season</option>
                                    <option value="Kharif">Kharif</option>
                                    <option value="Rabi">Rabi</option>
                                    <option value="Zaid">Zaid</option>
                                </select>

                            </div>

                            <div className="form-group">

                                <label>📍 Area (Acres)</label>

                                <input
                                    type="number"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>🌱 Sowing Date</label>

                                <input
                                    type="date"
                                    name="sowingDate"
                                    value={formData.sowingDate}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>🚜 Harvest Date</label>

                                <input
                                    type="date"
                                    name="expectedHarvestDate"
                                    value={formData.expectedHarvestDate}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="form-group full-width">

                                <label>📊 Status</label>

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="Planned">Planned</option>
                                    <option value="Growing">Growing</option>
                                    <option value="Harvested">Harvested</option>
                                </select>

                            </div>

                        </div>

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