from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
import os


# =====================================================
# Create Flask Application
# =====================================================

app = Flask(__name__)

CORS(app)


# =====================================================
# Load Trained ML Model
# =====================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "crop_yield_xgboost_model.pkl"
)

model = joblib.load(MODEL_PATH)

print("ML model loaded successfully!")


# =====================================================
# Home Route
# =====================================================

@app.route("/", methods=["GET"])
def home():

    return jsonify({

        "message": "Smart Agriculture ML API is running"

    })


# =====================================================
# Prediction Route
# =====================================================

@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.get_json()


        # ---------------------------------------------
        # Validate Request
        # ---------------------------------------------

        required_fields = [

            "Crop",
            "Crop_Year",
            "Season",
            "State",
            "Area",
            "Annual_Rainfall",
            "Fertilizer",
            "Pesticide"

        ]


        for field in required_fields:

            if field not in data:

                return jsonify({

                    "success": False,

                    "message":
                        f"Missing required field: {field}"

                }), 400


        # ---------------------------------------------
        # Create Input DataFrame
        # ---------------------------------------------

        input_data = pd.DataFrame([{

            "Crop": data["Crop"],

            "Crop_Year": data["Crop_Year"],

            "Season": data["Season"],

            "State": data["State"],

            "Area": data["Area"],

            "Annual_Rainfall":
                data["Annual_Rainfall"],

            "Fertilizer":
                data["Fertilizer"],

            "Pesticide":
                data["Pesticide"]

        }])


        # ---------------------------------------------
        # Make Prediction
        # ---------------------------------------------

        prediction_log = model.predict(
            input_data
        )[0]


        # ---------------------------------------------
        # Convert Back From Log Scale
        # ---------------------------------------------

        predicted_yield = np.expm1(
            prediction_log
        )


        # ---------------------------------------------
        # Return Prediction
        # ---------------------------------------------

        return jsonify({

            "success": True,

            "predictedYield": round(
                float(predicted_yield),
                4
            )

        })


    except Exception as error:

        print(
            "Prediction Error:",
            error
        )


        return jsonify({

            "success": False,

            "message": str(error)

        }), 500


# =====================================================
# Local Development Server
# =====================================================

if __name__ == "__main__":

    app.run(

        host="0.0.0.0",

        port=5001,

        debug=False

    )