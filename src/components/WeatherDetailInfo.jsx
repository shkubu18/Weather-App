export default function WeatherDetailInfo(props) {
  const { cityData } = props;

  return (
    <div className="weather-moreinfo-container">
      <div className="humidity-info">
        <h3>HUMIDITY</h3>
        <span>
          {cityData.current
            ? Math.round(cityData.current.humidity) + " %"
            : "N/A"}
        </span>
      </div>
      <div className="wind-info">
        <h3>WIND</h3>
        <span>
          {cityData.current
            ? Math.round(cityData.current.wind_kph) + " km/h"
            : "N/A"}{" "}
        </span>
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
              );
            })
          : "N/A"}
      </div>
    </div>
  );
}
