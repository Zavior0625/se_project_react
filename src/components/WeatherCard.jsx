function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p>{weatherData.temperature ?? "--"}°F</p>
    </section>
  );
}

export default WeatherCard;
