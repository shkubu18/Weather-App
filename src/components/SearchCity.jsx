import { useState } from "react";
import axios from "axios";
import SearchIcon from "../assets/icons/search-icon.svg";

export default function SearchCity(props) {
  const { setCityData } = props;
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setCityName(event.target.value);
  };

  const APIKEY = "8e0e04a4950c4f798a8125816222812";

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const getWeather = () => {
        axios
          .get(
            `https://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${cityName}&aqi=yes&alerts=no`
          )
          .then((response) => {
            setCityData(response.data);
            setError("");
          })
          .catch((error) => {
            if (error.response) {
              setError(error.response.data.error.message);
              console.clear();
            }
          });
      };
      getWeather();
    }
  };
  return (
    <div className="search-container">
      <div className="search">
        <img className="search-icon" src={SearchIcon} alt="search-icon" />
        <input
          type="text"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search city"
        />
      </div>
      <p>
        {error
          ? "No matching location found. please enter other city or write the name of the city correctly."
          : ""}
      </p>
    </div>
  );
}
