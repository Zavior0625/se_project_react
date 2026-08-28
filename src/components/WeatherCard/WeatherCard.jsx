import { useContext } from "react";
import PropTypes from "prop-types";
import "./WeatherCard.css";
import sunny from "../../assets/images/weather-sunny.svg";
import cloudy from "../../assets/images/weather-cloud.svg";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temperature =
    weatherData.temperature &&
    typeof weatherData.temperature[currentTemperatureUnit] === "number"
      ? `${Math.round(
          weatherData.temperature[currentTemperatureUnit],
        )}°${currentTemperatureUnit}`
      : "Loading...";

  const weatherImage =
    weatherData.type === "hot" || weatherData.type === "warm" ? sunny : cloudy;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{temperature}</p>

      <img
        className="weather-card__image"
        src={weatherImage}
        alt="Weather illustration"
      />
    </section>
  );
}

WeatherCard.propTypes = {
  weatherData: PropTypes.shape({
    temperature: PropTypes.shape({
      F: PropTypes.number,
      C: PropTypes.number,
    }),
    type: PropTypes.string,
  }).isRequired,
};

export default WeatherCard;
