import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function CropChart({ crops }) {

    const cropMap = {};

    crops.forEach((crop) => {

        cropMap[crop.cropName] =
            (cropMap[crop.cropName] || 0) + 1;

    });

    const data = {

        labels: Object.keys(cropMap),

        datasets: [

            {

                label: "Crop Statistics",

                data: Object.values(cropMap),

                backgroundColor: [

                    "#4CAF50",
                    "#81C784",
                    "#FFB74D",
                    "#64B5F6",
                    "#BA68C8",
                    "#FF8A65",
                    "#AED581"

                ],

                borderWidth: 1

            }

        ]

    };

    return (

        <div
            style={{
                background: "white",
                padding: "25px",
                borderRadius: "15px",
                boxShadow: "0 5px 15px rgba(0,0,0,.1)",
                marginBottom: "30px"
            }}
        >

            <h2
                style={{
                    textAlign: "center",
                    color: "#2E7D32",
                    marginBottom: "20px"
                }}
            >
                📊 Crop Statistics
            </h2>

            <div
                style={{
                    width: "350px",
                    margin: "0 auto"
                }}
            >

                <Pie data={data} />

            </div>

        </div>

    );

}

export default CropChart;