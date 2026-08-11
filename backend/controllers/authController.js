const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// =====================================================
// Register User
// =====================================================

const registerUser = async (req, res) => {

    try {

        const {
            fullName,
            email,
            mobile,
            password,
            state,
            district,
            village,
            landArea,
            primaryCrop
        } = req.body;


        // =================================================
        // Required Field Validation
        // =================================================

        if (
            !fullName ||
            !email ||
            !mobile ||
            !password ||
            !state ||
            !district ||
            !village ||
            landArea === undefined ||
            landArea === null ||
            !primaryCrop
        ) {

            return res.status(400).json({

                message: "All fields are required"

            });

        }


        // =================================================
        // Full Name Validation
        // =================================================

        const nameRegex = /^[A-Za-z ]+$/;

        if (
            fullName.trim().length < 3 ||
            !nameRegex.test(fullName.trim())
        ) {

            return res.status(400).json({

                message:
                    "Full name must contain at least 3 characters and only letters and spaces"

            });

        }


        // =================================================
        // Email Validation
        // =================================================

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {

            return res.status(400).json({

                message: "Please enter a valid email address"

            });

        }


        // =================================================
        // Mobile Validation
        // =================================================

        const mobileRegex = /^[6-9][0-9]{9}$/;

        if (!mobileRegex.test(mobile)) {

            return res.status(400).json({

                message:
                    "Mobile number must be a valid 10-digit Indian mobile number"

            });

        }


        // =================================================
        // Password Validation
        // =================================================

        if (password.length < 8) {

            return res.status(400).json({

                message:
                    "Password must contain at least 8 characters"

            });

        }


        if (!/[A-Z]/.test(password)) {

            return res.status(400).json({

                message:
                    "Password must contain at least one uppercase letter"

            });

        }


        if (!/[a-z]/.test(password)) {

            return res.status(400).json({

                message:
                    "Password must contain at least one lowercase letter"

            });

        }


        if (!/[0-9]/.test(password)) {

            return res.status(400).json({

                message:
                    "Password must contain at least one number"

            });

        }


        // =================================================
        // Village Validation
        // =================================================

        const villageRegex = /^[A-Za-z ]+$/;

        if (
            !village.trim() ||
            !villageRegex.test(village.trim())
        ) {

            return res.status(400).json({

                message:
                    "Village should contain only letters and spaces"

            });

        }


        // =================================================
        // Land Area Validation
        // =================================================

        const numericLandArea = Number(landArea);

        if (
            isNaN(numericLandArea) ||
            numericLandArea <= 0
        ) {

            return res.status(400).json({

                message:
                    "Land area must be greater than 0 acres"

            });

        }


        // =================================================
        // Primary Crop Validation
        // =================================================

        if (primaryCrop.trim().length < 2) {

            return res.status(400).json({

                message:
                    "Please enter a valid primary crop"

            });

        }


        // =================================================
        // Check Existing Email
        // =================================================

        const normalizedEmail =
            email.trim().toLowerCase();

        const existingUser =
            await User.findOne({
                email: normalizedEmail
            });


        if (existingUser) {

            return res.status(400).json({

                message:
                    "An account with this email already exists"

            });

        }


        // =================================================
        // Check Existing Mobile
        // =================================================

        const existingMobile =
            await User.findOne({
                mobile: mobile
            });


        if (existingMobile) {

            return res.status(400).json({

                message:
                    "An account with this mobile number already exists"

            });

        }


        // =================================================
        // Hash Password
        // =================================================

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );


        // =================================================
        // Create User
        // =================================================

        const user = new User({

            fullName:
                fullName.trim(),

            email:
                normalizedEmail,

            mobile,

            password:
                hashedPassword,

            state:
                state.trim(),

            district:
                district.trim(),

            village:
                village.trim(),

            landArea:
                numericLandArea,

            primaryCrop:
                primaryCrop.trim()

        });


        // =================================================
        // Save User
        // =================================================

        await user.save();


        // =================================================
        // Success Response
        // =================================================

        return res.status(201).json({

            message:
                "User registered successfully"

        });

    }


    catch (error) {

        console.error(
            "Registration Error:",
            error
        );


        return res.status(500).json({

            message:
                "Internal Server Error"

        });

    }

};


// =====================================================
// Login User
// =====================================================

const loginUser = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        if (!email || !password) {

            return res.status(400).json({

                message:
                    "Email and password are required"

            });

        }


        const user =
            await User.findOne({

                email:
                    email.trim().toLowerCase()

            });


        if (!user) {

            return res.status(404).json({

                message:
                    "User not found"

            });

        }


        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!isMatch) {

            return res.status(400).json({

                message:
                    "Invalid password"

            });

        }


        const token =
            jwt.sign(

                {
                    id: user._id
                },

                process.env.JWT_SECRET,

                {
                    expiresIn: "7d"
                }

            );


        return res.status(200).json({

            message:
                "Login successful",

            token

        });

    }


    catch (error) {

        console.error(
            "Login Error:",
            error
        );


        return res.status(500).json({

            message:
                "Internal Server Error"

        });

    }

};


// =====================================================
// Get Profile
// =====================================================

const getProfile = async (req, res) => {

    try {

        const user =
            await User.findById(
                req.user.id
            ).select("-password");


        if (!user) {

            return res.status(404).json({

                message:
                    "User not found"

            });

        }


        return res.status(200).json(user);

    }


    catch (error) {

        console.error(
            "Profile Error:",
            error
        );


        return res.status(500).json({

            message:
                "Internal Server Error"

        });

    }

};


// =====================================================
// Export Controllers
// =====================================================

module.exports = {

    registerUser,
    loginUser,
    getProfile

};