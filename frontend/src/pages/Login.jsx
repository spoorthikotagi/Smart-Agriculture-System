import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSeedling } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../services/api";
import "../styles/login.css";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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

            const response = await api.post("/auth/login", formData);

            localStorage.setItem("token", response.data.token);

            toast.success("Login Successful!");

            setTimeout(() => {

                navigate("/dashboard");

            }, 800);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Login Failed"
            );

        }

    };

    return (

        <div className="login-page">

            <div className="login-card">

                <div className="login-logo">

                    <FaSeedling color="#2E7D32" />

                </div>

                <h1 className="login-title">

                    🌾 Smart Agriculture

                </h1>

                <p className="login-subtitle">

                    Welcome Back! Login to continue.

                </p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button
                        className="login-btn"
                        type="submit"
                    >
                        Login
                    </button>

                </form>

                <p className="register-link">

                    Don't have an account?

                    <Link to="/register">

                        {" "}Register

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Login;