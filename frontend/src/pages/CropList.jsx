import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import api from "../services/api";
import "../styles/crops.css";

function CropList() {

    const [crops, setCrops] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const navigate = useNavigate();

    useEffect(() => {

        fetchCrops();

    }, []);

    const fetchCrops = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/crops", {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            });

            setCrops(response.data);

        }

        catch (error) {

            toast.error("Unable to fetch crops.");

        }

    };

    const deleteCrop = async (id) => {

        const result = await Swal.fire({

            title: "🗑 Delete Crop",

            text: "Are you sure you want to delete this crop? This action cannot be undone.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#d33",

            cancelButtonColor: "#3085d6",

            confirmButtonText: "Yes, Delete",

            cancelButtonText: "Cancel"

        });

        if (!result.isConfirmed)
            return;

        try {

            const token = localStorage.getItem("token");

            await api.delete(`/crops/${id}`, {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            });

            toast.success("Crop Deleted Successfully!");

            await fetchCrops();

        }

        catch (error) {

            toast.error("Unable to delete crop.");

        }

    };

    const filteredCrops = crops.filter((crop) => {

        const matchesSearch = crop.cropName
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "All" ||
            crop.status === statusFilter;

        return matchesSearch && matchesStatus;

    });

    return (

        <>

            <Navbar />

            <div className="crops-page">

                <h1 className="page-title">

                    🌾 My Crops

                </h1>

                <div className="search-filter">

                    <div className="search-box">

                        <FaSearch className="search-icon" />

                        <input
                            type="text"
                            placeholder="Search Crop..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >

                        <option value="All">All Status</option>
                        <option value="Planned">Planned</option>
                        <option value="Growing">Growing</option>
                        <option value="Harvested">Harvested</option>

                    </select>

                </div>

                <div className="table-container">

                    <table className="crop-table">

                        <thead>

                            <tr>

                                <th>Crop</th>
                                <th>Season</th>
                                <th>Area</th>
                                <th>Sowing Date</th>
                                <th>Harvest Date</th>
                                <th>Status</th>
                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredCrops.length > 0 ?

                                    filteredCrops.map((crop) => (

                                        <tr key={crop._id}>

                                            <td>{crop.cropName}</td>

                                            <td>{crop.season}</td>

                                            <td>{crop.area} Acres</td>

                                            <td>{new Date(crop.sowingDate).toLocaleDateString()}</td>

                                            <td>{new Date(crop.expectedHarvestDate).toLocaleDateString()}</td>

                                            <td>

                                                <span className={`status ${crop.status.toLowerCase()}`}>

                                                    {crop.status}

                                                </span>

                                            </td>

                                            <td>

                                                <button
                                                    className="edit-btn"
                                                    onClick={() => navigate(`/edit-crop/${crop._id}`)}
                                                >

                                                    <FaEdit />

                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() => deleteCrop(crop._id)}
                                                >

                                                    <FaTrash />

                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                    :

                                    <tr>

                                        <td colSpan="7">

                                            <div
                                                style={{
                                                    textAlign: "center",
                                                    padding: "40px"
                                                }}
                                            >

                                                <h3>🌱 No Crops Found</h3>

                                                <p>
                                                    Add your first crop to start managing your farm.
                                                </p>

                                            </div>

                                        </td>

                                    </tr>

                            }

                        </tbody>

                    </table>

                </div>

                <button
                    className="back-btn"
                    onClick={() => navigate("/dashboard")}
                >

                    ← Back to Dashboard

                </button>

            </div>

        </>

    );

}

export default CropList;