import PropTypes from "prop-types";
import "./Main.css";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";

function Main({ clothingItems, weatherData, onCardClick }) {
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
          Today is {weatherData.type || "..."}. You may want to wear:
        </p>

        <ul className="cards__list">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

Main.propTypes = {
  clothingItems: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      weather: PropTypes.string.isRequired,
    }),
  ).isRequired,
  weatherData: PropTypes.shape({
    type: PropTypes.string,
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default Main;
