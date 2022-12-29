import React from "react";
import axios from "axios";
import { useState } from "react";
import SunriseIcon from "./assets/icons/sunrise.png";
import SunsetIcon from "./assets/icons/sunset.png";
import SearchIcon from "./assets/icons/search-icon.svg";
import "./responsive.css";

export default function App() {
  const [cityData, setCityData] = useState({});
  const [cityName, setCityName] = useState('');
  const [error, setError] = useState('');

  const APIKEY = '8e0e04a4950c4f798a8125816222812';

  const handleChange = (event) => {
    setCityName(event.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const getWeather = () => {
        axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${cityName}&aqi=yes&alerts=no`).then((response) => {
          setCityData(response.data);
          setError('');
        }).catch(error => {
          if (error.response) {
            setError(error.response.data.error.message);
            console.clear();
          }
        });
      }
      getWeather();
    }
  }

  return (
    <>
      <div className="search-container">
        <div className="search">
          <img className="search-icon" src={SearchIcon} alt='search-icon' />
          <input type="text" onChange={handleChange} onKeyDown={handleKeyDown} placeholder='Search city' />
        </div>
        <p>{error ? 'No matching location found. please enter other city or write the name of the city correctly.' : ''}</p>
      </div>
      <div className="weather-main-container">
        <div className="weather-container">
          <h1 className="hint">{cityData.location ? '' : 'Please choose city'}</h1>
          <div className="city-name">
            <h2>Location</h2>
            <h4>{cityData.location ? cityData.location.name : 'N/A'}, {cityData.location ? cityData.location.country : 'N/A'}</h4>
          </div>
          <div className="date-time">
            <span>{cityData.location ? cityData.location.localtime : 'N/A'}</span>
          </div>
          <div className="weather-icon-container">
            {cityData.current ? <img className="weather-icon" src={cityData.current.condition.icon} alt="weather icon" /> : 'N/A'}
          </div>
          <div className="temp">
            <h1>{cityData.current ? Math.round(cityData.current.temp_c) : 'N/A'}&deg;C</h1>
          </div>
          <div className="weather-description">
            <h3>{cityData.current ? cityData.current.condition.text : 'N/A'}</h3>
            <div className="sunset-sunrise-info">
              <div className="sunrise">
                <img className="sunrise-icon" src={SunriseIcon} />
                <span className="sunrise-info">{cityData.forecast ? cityData.forecast.forecastday[0].astro.sunrise : 'N/A'}</span>
              </div>
              <div className="sunset">
                <img className="sunset-icon" src={SunsetIcon} />
                <span className="sunset-info">{cityData.forecast ? cityData.forecast.forecastday[0].astro.sunset : 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="weather-moreinfo-container">
          <div className="humidity-info">
            <h3>HUMIDITY</h3>
            <span>{cityData.current ? Math.round(cityData.current.humidity) + ' %' : 'N/A'}</span>
          </div>
          <div className="wind-info">
            <h3>WIND</h3>
            <span>{cityData.current ? Math.round(cityData.current.wind_kph) + ' km/h' : 'N/A'} </span>
          </div>
          <div className="hourly-info">
            {cityData.forecast
              ? cityData.forecast.forecastday[0].hour.map((exachour, index) => {
                return (
                  <div className="hour-info" key={index}>
                    <span>{exachour.time.slice(10)}</span>
                    <img src={exachour.condition.icon} />
                    <span>{Math.round(exachour.temp_c)}&deg;C</span>
                  </div>
                )
              })
              : 'N/A'}
          </div>
        </div>
      </div>
    </>
  )
}