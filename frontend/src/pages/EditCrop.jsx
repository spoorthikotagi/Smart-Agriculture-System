import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import api from "../services/api";
import "../styles/addCrop.css";

function EditCrop() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        cropName: "",
        season: "",
        area: "",
        sowingDate: "",
        expectedHarvestDate: "",
        status: "Planned"
    });

    useEffect(() => {

        fetchCrop();

    }, []);

    const fetchCrop = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/crops", {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            const crop = response.data.find(c => c._id === id);

            if (crop) {

                setFormData({

                    cropName: crop.cropName,
                    season: crop.season,
                    area: crop.area,
                    sowingDate: crop.sowingDate.split("T")[0],
                    expectedHarvestDate: crop.expectedHarvestDate.split("T")[0],
                    status: crop.status

                });

            }

        }

        catch (error) {

            toast.error("Unable to fetch crop details.");

        }

    };

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

            await api.put(

                `/crops/${id}`,

                formData,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            toast.success("Crop Updated Successfully!");

            setTimeout(() => {

                navigate("/crops");

            }, 800);

        }

        catch (error) {

            toast.error("Unable to update crop.");

        }

    };

    return (

        <>

            <Navbar />

            <div className="addcrop-page">

                <div className="addcrop-card">

                    <h1 className="addcrop-title">
                        ✏️ Edit Crop
                    </h1>

                    <p className="addcrop-subtitle">
                        Update your crop information
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
                                💾 Update Crop
                            </button>

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => navigate("/crops")}
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

export default EditCrop;