import React, { useState, useEffect } from "react";
import axios from "axios";

const Countries = ({ isDarkMode, handleCountryClick }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://restcountries.com/v3.1/all");
      console.log(result.data);
      setCountries(result.data.map((country) => ({
        name: country.name.common,
        flag: country.flags.svg,
        code: country.cca3, // add a unique identifier for each country
        population: country.population,
        region: country.region,
        capital: country.capital && country.capital[0], 
        native: country.name.nativeName,
        subregion: country.subregion,
        topLevelDomain: country.tld && country.tld[0],
        currencies: country.currencies,
        languages: country.languages,
        border: country.borders
      })));
    };

    fetchData();
  }, []);


  return (
    <div className="countries">
      <ul>
      {countries.slice(0, 8).map((country) => (
        <li key={country.code} onClick={() => handleCountryClick(country)} className="block-shadow">
        <img src={country.flag} alt={country.name} />
        <div className={`country-info ${isDarkMode ? "dark-theme dark-color" : "light-theme light-color"}`}>
          <h4>{country.name}</h4>
          <p><span className="bold">Population: </span>{country.population}</p>
          <p><span className="bold">Region: </span>{country.region}</p>
          <p><span className="bold">Capital: </span>{country.capital}</p>
        </div>
      </li>
        ))}
      </ul>
    </div>
  );
}

export default Countries;