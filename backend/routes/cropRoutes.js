const express = require("express");
const router = express.Router();

const {
    addCrop,
    getMyCrops,
    updateCrop,
    deleteCrop
} = require("../controllers/cropController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addCrop);

router.get("/", authMiddleware, getMyCrops);

router.put("/:id", authMiddleware, updateCrop);

router.delete("/:id", authMiddleware, deleteCrop);

module.exports = router;