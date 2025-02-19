import React, { useState, useEffect } from 'react';
import './weather.css';
import sunny from '../assets/clear-sunny.webp';
import clouds from '../assets/clouds.png';
import rain from '../assets/rainy.webp'
import ash from '../assets/ash.png'
import drizzle from '../assets/drizzle.png'
import dust from '../assets/dust.webp'
import haze from '../assets/haze.png'
import mist from '../assets/mist.png'
import sand from '../assets/sand.png'
import Thunderstorm from '../assets/Thunderstorm.png'
import smoke from '../assets/smoke.webp'
import snow from '../assets/snow.webp'
import tornado_squall from '../assets/tornado-Squall.png'

const Weather = () => {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState('');
  const [feelsLike, setFeelsLike] = useState('');
  const [min_temp, setMin_temp] = useState('');
  const [max_temp, setMax_temp] = useState('');
  const [humidity, setHumidity] = useState('');
  const [description, setDescription] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [weatherMain, setWeatherMain] = useState('');
  const [day, setDay] = useState('');
  const [date, setDate] = useState('');

  const API_KEY = 'dd668f81cf66e1a04683da6da24f4d58';
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const submit = async () => {
    if (city === "" || city === null) {
      alert("Please enter a city name!");
      return;
    }
  
    try {
      const response = await fetch(URL);
      const data = await response.json();
  
      if (data.cod === "404") {
        alert("City not found! Please enter a valid city name.");
        return;
      }
  
      setTemperature(data.main.temp);
      setFeelsLike(data.main.feels_like);
      setHumidity(data.main.humidity);
      setMin_temp(data.main.temp_min);
      setMax_temp(data.main.temp_max);
      setDescription(data.weather[0].description);
      setWindSpeed(data.wind.speed);
      setWeatherMain(data.weather[0].main);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Something went wrong. Please try again later.");
    }
  };
  
  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  }

  useEffect(() => {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const formattedDate = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    setDay(days[now.getDay()]);
    setDate(formattedDate);
  });

  const weatherImages = {
    Clear: sunny, 
    Clouds: clouds, 
    Rain: rain,
    Drizzle: drizzle,
    Thunderstorm: Thunderstorm, 
    Snow: snow,
    Mist: mist,
    Haze: haze, 
    Smoke: smoke,
    Fog: smoke,
    Dust: dust,
    Sand: sand,
    Ash: ash,
    Squall: tornado_squall,
    Tornado: tornado_squall,    
  };

  console.log([weatherMain])

  return (
    // container
    <div className="container">

      <div className="content">
        <input
          type="text"
          value={city}
          className="inp"
          placeholder="Search Location"
          onKeyDown={handleSubmit}
          onChange={(e) => setCity(e.target.value)}
        />

        <button className="btn" onClick={submit}>
          <i className="search">Search</i>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>

        {temperature && weatherMain ? (
          <>
            <div className="main-info">
              <div className="subContent">
                <p>Temperature: {temperature}°C</p>
                <p>Feels Like: {feelsLike}°C</p>
                <p>Humidity: {humidity}%</p>
                <p>Minimum Temperature: {min_temp}°C</p>
                <p>Maximum Temperature: {max_temp}°C</p>
                <p>Description: {description}</p>
                <p>Wind Speed: {windSpeed} m/s</p>
              </div>
              <div className="subContent">
                <img src={weatherImages[weatherMain]} alt={weatherMain} className="weather-icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="default-message">
            <p>Search for a city to see the weather forecast!</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Weather;
