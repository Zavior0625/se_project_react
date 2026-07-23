import "./Main.css";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";

function Main({ clothingItems, weatherData, onCardClick }) {
  const filteredItems = clothingItems.filter(
    (item) => item.weather.toLowerCase() === weatherData.type,
  );

  return (
    <main>
      <WeatherCard weatherData={weatherData} />

      <ul>
        {filteredItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </main>
  );
}

export default Main;
