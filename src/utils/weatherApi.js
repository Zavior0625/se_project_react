import { APIkey, coordinates } from "./constants";

export function getWeather() {
  const { latitude, longitude } = coordinates;

  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`,
  ).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }

    return res.json();
  });
}

export function getWeatherCondition(temp) {
  if (temp >= 86) return "hot";
  if (temp >= 66) return "warm";
  return "cold";
}
