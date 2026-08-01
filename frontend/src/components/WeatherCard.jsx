import { useEffect, useState } from "react";
import axios from "axios";

function WeatherCard() {

    const [weather, setWeather] = useState(null);

    useEffect(() => {

        fetchWeather();

    }, []);

    const fetchWeather = async () => {

        try {

            const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

            const response = await axios.get(

                `https://api.openweathermap.org/data/2.5/weather?q=Hubballi&units=metric&appid=${apiKey}`

            );

            setWeather(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    if (!weather) {

        return <p>Loading weather...</p>;

    }

    return (

        <div className="stat-card">

            <h3>☀ Today's Weather</h3>

            <h2>{weather.main.temp}°C</h2>

            <p>{weather.weather[0].main}</p>

            <p>💧 Humidity : {weather.main.humidity}%</p>

            <p>🌬 Wind : {weather.wind.speed} m/s</p>

        </div>

    );

}

export default WeatherCard;