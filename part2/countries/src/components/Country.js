import { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    const params = {
      q: country.capital[0],
      appid: process.env.REACT_APP_API_KEY,
      units: "metric",
    };

    axios.get("http://api.openweathermap.org/data/2.5/weather", { params }).then((response) => setWeather(response.data));
  }, [country]);

  if (weather) {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital[0]}</p>
        <p>
          Area: {country.area} km<sup>2</sup>
        </p>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map((lang, i) => (
            <li key={i}>{lang}</li>
          ))}
        </ul>
        <img src={country.flags.png} width="200" alt={`${country.name.common} Flag`} />
        <h2>Weather in {country.capital[0]}</h2>
        <p>Temperature: {weather.main.temp}°C</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
        <p>Wind: {weather.wind.speed}m/s</p>
      </div>
    );
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>
        Area: {country.area} km<sup>2</sup>
      </p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((lang, i) => (
          <li key={i}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} width="200" alt={`${country.name.common} Flag`} />
    </div>
  );
};

export default Country;
