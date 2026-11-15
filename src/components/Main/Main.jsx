import { useContext } from "react";
import PropTypes from "prop-types";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ clothingItems, weatherData, onCardClick, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredItems = weatherData.type
    ? clothingItems.filter(
        (item) => item.weather.toLowerCase() === weatherData.type.toLowerCase(),
      )
    : clothingItems;

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {weatherData.temperature
            ? `${weatherData.temperature[currentTemperatureUnit]}°${currentTemperatureUnit}`
            : "..."}
          . You may want to wear:
        </p>

        <ul className="cards__list">
          {filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

Main.propTypes = {
  clothingItems: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      weather: PropTypes.string.isRequired,
    }),
  ).isRequired,

  weatherData: PropTypes.shape({
    temperature: PropTypes.shape({
      F: PropTypes.number,
      C: PropTypes.number,
    }),
    type: PropTypes.string,
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
};

export default Main;
