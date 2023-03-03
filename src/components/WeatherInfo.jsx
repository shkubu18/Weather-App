import SunriseIcon from "../assets/icons/sunrise.png";
import SunsetIcon from "../assets/icons/sunset.png";

export default function WeatherInfo(props) {
  const { cityData } = props;

  return (
    <div className="weather-container">
      <h1 className="hint">{cityData.location ? "" : "Please choose city"}</h1>
      <div className="city-name">
        <h2>Location</h2>
        <h4>
          {cityData.location ? cityData.location.name : "N/A"},{" "}
          {cityData.location ? cityData.location.country : "N/A"}
        </h4>
      </div>
      <div className="date-time">
        <span>{cityData.location ? cityData.location.localtime : "N/A"}</span>
      </div>
      <div className="weather-icon-container">
        {cityData.current ? (
          <img
            className="weather-icon"
            src={cityData.current.condition.icon}
            alt="weather icon"
          />
        ) : (
          "N/A"
        )}
      </div>
      <div className="temp">
        <h1>
          {cityData.current ? Math.round(cityData.current.temp_c) : "N/A"}&deg;C
        </h1>
      </div>
      <div className="weather-description">
        <h3>{cityData.current ? cityData.current.condition.text : "N/A"}</h3>
        <div className="sunset-sunrise-info">
          <div className="sunrise">
            <img className="sunrise-icon" src={SunriseIcon} />
            <span className="sunrise-info">
              {cityData.forecast
                ? cityData.forecast.forecastday[0].astro.sunrise
                : "N/A"}
            </span>
          </div>
          <div className="sunset">
            <img className="sunset-icon" src={SunsetIcon} />
            <span className="sunset-info">
              {cityData.forecast
                ? cityData.forecast.forecastday[0].astro.sunset
                : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
