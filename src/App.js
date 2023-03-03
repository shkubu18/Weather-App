import React from "react";
import { useState } from "react";
import "./responsive.css";
import WeatherInfo from "./components/WeatherInfo";
import WeatherDetailInfo from "./components/WeatherDetailInfo";
import SearchCity from "./components/SearchCity";

export default function App() {
  const [cityData, setCityData] = useState({});

  return (
    <>
      <SearchCity setCityData={setCityData} />
      <div className="weather-main-container">
        <WeatherInfo cityData={cityData} />
        <WeatherDetailInfo cityData={cityData} />
      </div>
    </>
  );
}
