import { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ value, onChange }) => (
  <div>
    find countries <input value={value} onChange={onChange} />
  </div>
);

const Countries = ({ countries, setCountries }) => {
  if (countries.length > 10) {
    return <div>too many matches, specify another filter</div>;
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map((country, i) => (
          <p key={i}>
            {country.name.common} <button onClick={() => setCountries([country])}>show</button>
          </p>
        ))}
      </div>
    );
  } else if (countries.length === 1) {
    let country = countries[0];
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
  }
};

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => setAllCountries(response.data));
  }, []);

  const handleSearchChange = (event) => {
    setCountries(allCountries.filter((country) => country.name.common.toLowerCase().includes(event.target.value)));
    setSearch(event.target.value);
  };

  return (
    <div>
      <Filter value={search} onChange={handleSearchChange} />
      <Countries countries={countries} setCountries={setCountries} />
    </div>
  );
};

export default App;
