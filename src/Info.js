import React from "react";
import "./App.css";

function Infos({ country, handleBorderClick, setPage, setSearchQuery, isDarkMode }) {

    const goBack = () => {
        setPage(0); 
        setSearchQuery("");
    }

  return (
    <div className="info-wrapper">
        <div className="info-header">
            <div className={`go-back ${isDarkMode ? "dark-theme dark-color dark-shadow" : "light-theme light-shadow light-color"}`} onClick={() => goBack()}>
            <i className="fa-solid fa-arrow-left" style={{ color: !isDarkMode ? '#000' : '#ffffff' }}></i>
                <p>Back</p>
            </div>
        </div>
        <div className="one-country">
            <div className="country-flag">
                <img src={country.flag} className="country-flag" alt={country.name} />
            </div>
            <div className={`country-informations ${isDarkMode ? "dark-color" : "light-color"}`}>
            <h1>{country.name}</h1>
                <div className="country-info-wrapper">
                    <div className="first-infos">
                        <p><span className="bold">Native Name: </span><span className="opacitym">{Object.values(country.native)[0].official}</span></p>
                        <p><span className="bold">Population: </span><span className="opacitym">{country.population}</span></p>
                        <p><span className="bold">Region: </span><span className="opacitym">{country.region}</span></p>
                        <p><span className="bold">Sub Region: </span><span className="opacitym">{country.subregion}</span></p>
                        <p><span className="bold">Capital: </span><span className="opacitym">{country.capital}</span></p>
                    </div>
                    <div className="second-infos">
                        <p><span className="bold">Top Level Domain: </span><span className="opacitym">{country.topLevelDomain}</span></p>
                        <p><span className="bold">Currencies: </span><span className="opacitym">{country.currencies ? Object.values(country.currencies).map(currency => currency.name).join(", ") : ""}</span></p>
                        <p><span className="bold">Languages: </span><span className="opacitym">{country.languages ? Object.values(country.languages).map(language => language).join(", ") : ""}</span></p>
                    </div>
            </div>
                <div className="border-name">
                    {country.borders.length > 0 ? (
                    <div className="border-wrapper">
                        <p>Border Countries:</p>
                        <ul>
                        {country.borders.map((border, index) => (
                            <li key={index} className={` ${isDarkMode ? "dark-theme dark-color" : "light-theme light-shadow light-color"}`} onClick={() => handleBorderClick(border)}>{border}</li>
                        ))}
                        </ul>
                    </div>
                    ) : (
                    <p>This country has no land borders.</p>
                    )}
                </div>
            </div>
        </div>
    </div>

  );
}

export default Infos;