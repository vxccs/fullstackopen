import axios from 'axios';
import { useEffect, useState } from 'react';

const Filter = ({ search, setSearch }) => {
  return (
    <div>
      find countries <input value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  );
};

const Countries = ({ countries, setSearch }) => {
  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else if (countries.length > 10) {
    return <p>too many matches, specify another filter</p>;
  } else {
    return (
      <div>
        {countries.map((country) => (
          <p key={country.cca3}>
            {country.name.common} <button onClick={() => setSearch(country.name.common)}>show</button>
          </p>
        ))}
      </div>
    );
  }
};

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const [lat, lng] = country.latlng;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&units=metric`
      )
      .then((response) => setWeather(response.data));

    return () => setWeather(null);
  }, [country]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <p>languages:</p>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
      <Weather weatherData={weather} />
    </div>
  );
};

const Weather = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }
  return (
    <div>
      <h2>Weather</h2>
      <p>temperature: {weatherData.main.temp}C</p>
      <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}></img>
      <p>wind: {weatherData.wind.speed} m/s</p>
    </div>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((res) => setCountries(res.data));
  }, []);

  const countriesToShow = search
    ? countries.filter((c) => c.name.common.toLowerCase().includes(search.toLowerCase()))
    : countries;

  return (
    <div>
      <Filter search={search} setSearch={setSearch} />
      <Countries countries={countriesToShow} setSearch={setSearch} />
    </div>
  );
}

export default App;
