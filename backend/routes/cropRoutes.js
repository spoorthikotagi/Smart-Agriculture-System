const express = require("express");

const router = express.Router();


const {
    addCrop,
    getMyCrops,
    updateCrop,
    deleteCrop,
    predictYield
} = require("../controllers/cropController");


const authMiddleware = require("../middleware/authMiddleware");


// =====================================================
// Crop CRUD Routes
// =====================================================

router.post(
    "/",
    authMiddleware,
    addCrop
);


router.get(
    "/",
    authMiddleware,
    getMyCrops
);


router.put(
    "/:id",
    authMiddleware,
    updateCrop
);


router.delete(
    "/:id",
    authMiddleware,
    deleteCrop
);


// =====================================================
// ML Prediction Route
// =====================================================

router.post(
    "/predict-yield",
    authMiddleware,
    predictYield
);


module.exports = router;