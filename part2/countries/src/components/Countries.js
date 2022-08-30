import Country from "./Country";

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
    return <Country country={countries[0]} />;
  }
};

export default Countries;
