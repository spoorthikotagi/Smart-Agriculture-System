import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSeedling } from "react-icons/fa";
import { toast } from "react-toastify";
import { State, City } from "country-state-city";

import api from "../services/api";
import "../styles/register.css";

function Register() {

    const navigate = useNavigate();

    const [states, setStates] = useState([]);

    const [districts, setDistricts] = useState([]);

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

    useEffect(() => {

        const allStates = State.getStatesOfCountry("IN");

        setStates(allStates);

    }, []);

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "state") {

            const selectedState = states.find(

                (state) => state.name === value

            );

            if (selectedState) {

                const cities = City.getCitiesOfState(

                    "IN",

                    selectedState.isoCode

                );

                setDistricts(cities);

            }

            else {

                setDistricts([]);

            }

            setFormData({

                ...formData,

                state: value,

                district: ""

            });

            return;

        }

        setFormData({

            ...formData,

            [name]: value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(

                "/auth/register",

                formData

            );

            toast.success(response.data.message);

            setTimeout(() => {

                navigate("/login");

            }, 1000);

        }

        catch (error) {

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

                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                Select State
                            </option>

                            {

                                states.map((state) => (

                                    <option
                                        key={state.isoCode}
                                        value={state.name}
                                    >

                                        {state.name}

                                    </option>

                                ))

                            }

                        </select>

                        <select
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            required
                            disabled={!formData.state}
                        >
                            <option value="">
                                Select District
                            </option>

                            {

                                districts.map((district) => (

                                    <option
                                        key={district.name}
                                        value={district.name}
                                    >

                                        {district.name}

                                    </option>

                                ))

                            }

                        </select>

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

                        <button
                            className="register-btn full-width"
                            type="submit"
                        >

                            Register

                        </button>

                    </div>

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