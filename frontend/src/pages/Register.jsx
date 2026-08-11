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
    const [loading, setLoading] = useState(false);

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


    // =====================================================
    // Load Indian States
    // =====================================================

    useEffect(() => {

        const allStates = State.getStatesOfCountry("IN");

        setStates(allStates);

    }, []);


    // =====================================================
    // Handle Input Changes
    // =====================================================

    const handleChange = (e) => {

        const { name, value } = e.target;


        // ---------------------------------------------
        // Mobile Number
        // Allow only digits and maximum 10 digits
        // ---------------------------------------------

        if (name === "mobile") {

            const mobileValue =
                value.replace(/\D/g, "").slice(0, 10);

            setFormData({

                ...formData,

                mobile: mobileValue

            });

            return;

        }


        // ---------------------------------------------
        // Land Area
        // ---------------------------------------------

        if (name === "landArea") {

            // Allow numbers with up to 2 decimal places

            if (/^\d*\.?\d{0,2}$/.test(value)) {

                setFormData({

                    ...formData,

                    landArea: value

                });

            }

            return;

        }


        // ---------------------------------------------
        // State
        // ---------------------------------------------

        if (name === "state") {

            const selectedState = states.find(

                (state) =>
                    state.name === value

            );


            if (selectedState) {

                const cities =
                    City.getCitiesOfState(

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


        // ---------------------------------------------
        // Other Fields
        // ---------------------------------------------

        setFormData({

            ...formData,

            [name]: value

        });

    };


    // =====================================================
    // Validate Form
    // =====================================================

    const validateForm = () => {

        // ---------------------------------------------
        // Full Name
        // ---------------------------------------------

        const nameRegex = /^[A-Za-z ]+$/;

        if (!formData.fullName.trim()) {

            toast.error("Please enter your full name");

            return false;

        }

        if (formData.fullName.trim().length < 3) {

            toast.error(
                "Full name must contain at least 3 characters"
            );

            return false;

        }

        if (!nameRegex.test(formData.fullName.trim())) {

            toast.error(
                "Full name should contain only letters and spaces"
            );

            return false;

        }


        // ---------------------------------------------
        // Mobile Number
        // ---------------------------------------------

        const mobileRegex = /^[6-9][0-9]{9}$/;

        if (!mobileRegex.test(formData.mobile)) {

            toast.error(
                "Enter a valid 10-digit mobile number"
            );

            return false;

        }


        // ---------------------------------------------
        // State
        // ---------------------------------------------

        if (!formData.state) {

            toast.error("Please select your state");

            return false;

        }


        // ---------------------------------------------
        // District
        // ---------------------------------------------

        if (!formData.district) {

            toast.error("Please select your district");

            return false;

        }


        // ---------------------------------------------
        // Village
        // ---------------------------------------------

        const villageRegex = /^[A-Za-z ]+$/;

        if (!formData.village.trim()) {

            toast.error("Please enter your village");

            return false;

        }

        if (!villageRegex.test(formData.village.trim())) {

            toast.error(
                "Village name should contain only letters and spaces"
            );

            return false;

        }


        // ---------------------------------------------
        // Land Area
        // ---------------------------------------------

        const landArea = Number(formData.landArea);

        if (
            formData.landArea === "" ||
            isNaN(landArea)
        ) {

            toast.error(
                "Please enter your land area"
            );

            return false;

        }

        if (landArea <= 0) {

            toast.error(
                "Land area must be greater than 0 acres"
            );

            return false;

        }


        // ---------------------------------------------
        // Primary Crop
        // ---------------------------------------------

        if (!formData.primaryCrop.trim()) {

            toast.error(
                "Please enter your primary crop"
            );

            return false;

        }

        if (formData.primaryCrop.trim().length < 2) {

            toast.error(
                "Please enter a valid primary crop"
            );

            return false;

        }


        // ---------------------------------------------
        // Email
        // ---------------------------------------------

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email.trim()) {

            toast.error("Please enter your email");

            return false;

        }

        if (!emailRegex.test(formData.email.trim())) {

            toast.error(
                "Please enter a valid email address"
            );

            return false;

        }


        // ---------------------------------------------
        // Password
        // ---------------------------------------------

        if (!formData.password) {

            toast.error("Please enter a password");

            return false;

        }

        if (formData.password.length < 8) {

            toast.error(
                "Password must contain at least 8 characters"
            );

            return false;

        }

        if (!/[A-Z]/.test(formData.password)) {

            toast.error(
                "Password must contain at least one uppercase letter"
            );

            return false;

        }

        if (!/[a-z]/.test(formData.password)) {

            toast.error(
                "Password must contain at least one lowercase letter"
            );

            return false;

        }

        if (!/[0-9]/.test(formData.password)) {

            toast.error(
                "Password must contain at least one number"
            );

            return false;

        }


        return true;

    };


    // =====================================================
    // Handle Registration
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        // Stop if validation fails

        if (!validateForm()) {

            return;

        }


        try {

            setLoading(true);


            const response = await api.post(

                "/auth/register",

                {

                    ...formData,

                    fullName:
                        formData.fullName.trim(),

                    village:
                        formData.village.trim(),

                    primaryCrop:
                        formData.primaryCrop.trim(),

                    email:
                        formData.email.trim().toLowerCase(),

                    landArea:
                        Number(formData.landArea)

                }

            );


            toast.success(

                response.data.message ||
                "Registration successful!"

            );


            setTimeout(() => {

                navigate("/login");

            }, 1000);

        }


        catch (error) {

            console.error(
                "Registration Error:",
                error
            );


            toast.error(

                error.response?.data?.message ||

                "Registration Failed"

            );

        }


        finally {

            setLoading(false);

        }

    };


    // =====================================================
    // JSX
    // =====================================================

    return (

        <div className="register-page">

            <div className="register-card">


                {/* Logo */}

                <div className="register-logo">

                    <FaSeedling color="#2E7D32" />

                </div>


                {/* Title */}

                <h1 className="register-title">

                    🌾 Farmer Registration

                </h1>


                <p className="register-subtitle">

                    Create your Smart Agriculture account

                </p>


                {/* Registration Form */}

                <form onSubmit={handleSubmit}>

                    <div className="form-grid">


                        {/* Full Name */}

                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            minLength="3"
                        />


                        {/* Mobile */}

                        <input
                            type="tel"
                            name="mobile"
                            placeholder="Mobile Number"
                            value={formData.mobile}
                            onChange={handleChange}
                            maxLength="10"
                            inputMode="numeric"
                            required
                        />


                        {/* State */}

                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        >

                            <option value="">

                                Select State

                            </option>


                            {states.map((state) => (

                                <option
                                    key={state.isoCode}
                                    value={state.name}
                                >

                                    {state.name}

                                </option>

                            ))}

                        </select>


                        {/* District */}

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


                            {districts.map((district) => (

                                <option
                                    key={district.name}
                                    value={district.name}
                                >

                                    {district.name}

                                </option>

                            ))}

                        </select>


                        {/* Village */}

                        <input
                            type="text"
                            name="village"
                            placeholder="Village"
                            value={formData.village}
                            onChange={handleChange}
                            required
                        />


                        {/* Land Area */}

                        <input
                            type="number"
                            name="landArea"
                            placeholder="Land Area (Acres)"
                            value={formData.landArea}
                            onChange={handleChange}
                            min="0.01"
                            step="0.01"
                            required
                        />


                        {/* Primary Crop */}

                        <input
                            type="text"
                            name="primaryCrop"
                            placeholder="Primary Crop"
                            value={formData.primaryCrop}
                            onChange={handleChange}
                            required
                        />


                        {/* Email */}

                        <input
                            className="full-width"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />


                        {/* Password */}

                        <input
                            className="full-width"
                            type="password"
                            name="password"
                            placeholder="Password (min 8 characters)"
                            value={formData.password}
                            onChange={handleChange}
                            minLength="8"
                            required
                        />


                        {/* Register Button */}

                        <button
                            className="register-btn full-width"
                            type="submit"
                            disabled={loading}
                        >

                            {loading
                                ? "Registering..."
                                : "Register"
                            }

                        </button>


                    </div>

                </form>


                {/* Login Link */}

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