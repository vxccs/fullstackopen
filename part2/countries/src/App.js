import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

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
