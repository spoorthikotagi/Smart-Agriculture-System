require("dotenv").config();
const dns = require("dns");

// Use Google's DNS servers
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const cropRoutes = require("./routes/cropRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("✅ MongoDB Connected:", mongoose.connection.host);
    })
    .catch((error) => {
        console.log(error);
    });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/crops", cropRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("Smart Agriculture API is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});