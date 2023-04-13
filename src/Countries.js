import React, {  useEffect } from "react";
import axios from "axios";

const Countries = ({ searchQuery, selectedRegion, countries, setCountries, isDarkMode, handleCountryClick }) => {

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://restcountries.com/v3.1/all");
      console.log(result.data);
      const countriesData = result.data.map(async (country) => {
        let borderNames = [];
        if (country.borders) {
          const borders = await Promise.all(
            country.borders.map((border) =>
              axios.get(`https://restcountries.com/v2/alpha/${border}`)
                .then(response => {
                  return response.data; // Return response.data instead of response
                })
            )
          );
          borderNames = borders.map((border) => {
            return border.name.replace(/\s*\([^)]*\)/, ''); // Use a regular expression to remove text inside parentheses
          });
          borderNames = Array.from(new Set(borderNames)); 
        }
        return {
          name: country.name.common,
          flag: country.flags.svg,
          code: country.cca3,
          population: country.population,
          region: country.region,
          capital: country.capital && country.capital[0],
          native: country.name.nativeName,
          subregion: country.subregion,
          topLevelDomain: country.tld && country.tld[0],
          currencies: country.currencies,
          languages: country.languages,
          borders: borderNames,
        };
      });
      const countries = await Promise.all(countriesData);
      setCountries(countries);
    };

    fetchData();
  }, [setCountries]);

  const displayCountry = (country) => {
    return (
      <li key={country.code} onClick={() => handleCountryClick(country)} className="block-shadow">
      <img src={country.flag} alt={country.name} />
      <div className={`country-info ${isDarkMode ? "dark-theme dark-color" : "light-theme light-color"}`}>
        <h4>{country.name}</h4>
        <p><span className="bold">Population: </span><span className="opacitym">{country.population}</span></p>
        <p><span className="bold">Region: </span><span className="opacitym">{country.region}</span></p>
        <p><span className="bold">Capital: </span><span className="opacitym">{country.capital}</span></p>
      </div>
    </li>
    )
  }

  const orderedCountries = ["Germany", "United States", "Brazil", "Iceland", "Afghanistan", "Åland Islands", "Albania", "Algeria"];

  return (
    <div className="countries">
      {selectedRegion.length > 0 && (searchQuery === "" || !searchQuery) ? (
        <ul>
          {countries
            .filter((country) => country.region === selectedRegion)
            .slice(0, 8)
            .map((country) => (
              displayCountry(country)
            ))}

        </ul>
      ) : (
        <ul>
           {(searchQuery && searchQuery.length > 0) &&
            countries
            .filter((country) =>
              country.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .slice(0, 8)
            .map((country) => (
              displayCountry(country)
            ))}
          {(searchQuery === "" || !searchQuery) &&
          countries
          .filter(country => orderedCountries.includes(country.name))
          .sort((a, b) => orderedCountries.indexOf(a.name) - orderedCountries.indexOf(b.name))
          .map((country) => (
            displayCountry(country)
          ))}
        </ul>
      )}
    </div>
  );


}

export default Countries;