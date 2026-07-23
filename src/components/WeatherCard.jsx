import PropTypes from "prop-types";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  return <section>{weatherData.temperature}°</section>;
}

WeatherCard.propTypes = {
  weatherData: PropTypes.shape({
    temperature: PropTypes.number,
  }).isRequired,
};

export default WeatherCard;
