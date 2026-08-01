import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSeedling } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../services/api";
import "../styles/register.css";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        mobile: "",
        state: "",
        district: "",
        village: "",
        landArea: "",
        primaryCrop: "",
        email: "",
        password: ""
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

            const response = await api.post("/auth/register", formData);

            toast.success(response.data.message);

            setTimeout(() => {

                navigate("/login");

            }, 800);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Registration Failed"
            );

        }

    };

    return (

        <div className="register-page">

            <div className="register-card">

                <div className="register-logo">

                    <FaSeedling color="#2E7D32" />

                </div>

                <h1 className="register-title">
                    🌾 Farmer Registration
                </h1>

                <p className="register-subtitle">
                    Create your Smart Agriculture account
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="form-grid">

                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="mobile"
                            placeholder="Mobile Number"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="district"
                            placeholder="District"
                            value={formData.district}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="village"
                            placeholder="Village"
                            value={formData.village}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="number"
                            name="landArea"
                            placeholder="Land Area (Acres)"
                            value={formData.landArea}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="primaryCrop"
                            placeholder="Primary Crop"
                            value={formData.primaryCrop}
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="full-width"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="full-width"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <button
                        className="register-btn"
                        type="submit"
                    >
                        Register
                    </button>

                </form>

                <p className="login-link">

                    Already have an account?

                    <Link to="/login">
                        {" "}Login
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;