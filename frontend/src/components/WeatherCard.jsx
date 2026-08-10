import { useEffect, useState } from "react";
import axios from "axios";

function WeatherCard() {

    const [weather, setWeather] = useState(null);


    // =====================================================
    // Fetch Weather
    // =====================================================

    useEffect(() => {

        fetchWeather();

    }, []);


    const fetchWeather = async () => {

        try {

            const apiKey =
                import.meta.env.VITE_WEATHER_API_KEY;


            const response = await axios.get(

                `https://api.openweathermap.org/data/2.5/weather?q=Hubballi&units=metric&appid=${apiKey}`

            );


            setWeather(response.data);

        }

        catch (error) {

            console.log(
                "Weather Error:",
                error
            );

        }

    };


    // =====================================================
    // Loading
    // =====================================================

    if (!weather) {

        return (
            <p>Loading weather...</p>
        );

    }


    // =====================================================
    // Weather Values
    // =====================================================

    const temperature =
        weather.main.temp;

    const humidity =
        weather.main.humidity;

    const windSpeed =
        weather.wind.speed;

    const condition =
        weather.weather[0].main;


    // =====================================================
    // Smart Farming Alert
    // =====================================================

    let alertMessage =
        "Weather conditions look suitable for farming.";

    let alertIcon = "🌱";


    if (temperature >= 35) {

        alertMessage =
            "High temperature detected. Consider providing additional irrigation and protecting crops from heat stress.";

        alertIcon = "🔥";

    }

    else if (temperature <= 15) {

        alertMessage =
            "Low temperature detected. Sensitive crops may require protection from cold conditions.";

        alertIcon = "❄️";

    }

    else if (humidity >= 85) {

        alertMessage =
            "High humidity detected. Monitor crops for fungal diseases and excessive moisture.";

        alertIcon = "💧";

    }

    else if (
        condition.toLowerCase().includes("rain")
    ) {

        alertMessage =
            "Rainfall detected. Avoid unnecessary irrigation and monitor field drainage.";

        alertIcon = "🌧️";

    }

    else if (windSpeed >= 10) {

        alertMessage =
            "Strong winds detected. Check crops and support structures for possible damage.";

        alertIcon = "💨";

    }


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="weather-card">


            {/* ========================================= */}
            {/* Weather Header */}
            {/* ========================================= */}

            <div className="weather-header">

                <h3>

                    ☀ Today's Weather

                </h3>

            </div>


            {/* ========================================= */}
            {/* Main Temperature */}
            {/* ========================================= */}

            <div className="weather-main">

                <h2>

                    {temperature}°C

                </h2>

                <p>

                    {condition}

                </p>

            </div>


            {/* ========================================= */}
            {/* Weather Details */}
            {/* ========================================= */}

            <div className="weather-details">


                <div>

                    <span>
                        💧
                    </span>

                    <strong>
                        {humidity}%
                    </strong>

                    <small>
                        Humidity
                    </small>

                </div>


                <div>

                    <span>
                        🌬
                    </span>

                    <strong>
                        {windSpeed} m/s
                    </strong>

                    <small>
                        Wind
                    </small>

                </div>

            </div>


            {/* ========================================= */}
            {/* Smart Farming Alert */}
            {/* ========================================= */}

            <div className="farming-alert">

                <div className="alert-icon">

                    {alertIcon}

                </div>


                <div>

                    <strong>

                        Smart Farming Alert

                    </strong>


                    <p>

                        {alertMessage}

                    </p>

                </div>

            </div>


        </div>

    );

}


export default WeatherCard;