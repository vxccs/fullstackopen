import { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ value, onChange }) => (
  <div>
    find countries <input value={value} onChange={onChange} />
  </div>
);

const Countries = ({ countriesToShow }) => {
  if (countriesToShow.length > 10) {
    return <div>too many matches, specify another filter</div>;
  } else if (countriesToShow.length > 1) {
    return (
      <div>
        {countriesToShow.map((country) => (
          <p key={country.cca2}>{country.name.common}</p>
        ))}
      </div>
    );
  } else if (countriesToShow.length === 1) {
    let country = countriesToShow[0];
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>
          Area: {country.area} km<sup>2</sup>
        </p>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img src={country.flags.png} width="200" />
      </div>
    );
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => setCountries(response.data));
  });

  const handleSearchChange = (event) => setSearch(event.target.value);

  const countriesToShow = countries.filter((country) => country.name.common.toLowerCase().includes(search));

  return (
    <div>
      <Filter value={search} onChange={handleSearchChange} />
      <Countries countriesToShow={countriesToShow} />
    </div>
  );
};

export default App;
