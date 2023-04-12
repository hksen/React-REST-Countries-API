import react, { useState, useEffect } from 'react';
import './App.css';
import Main from './Main';
import Infos from './Info';
import axios from "axios";
import Countries from './Countries';

function App() {

  const [pages, setPage] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('isDarkMode');
    return savedMode !== null ? JSON.parse(savedMode) : false;
  });
  const [countries, setCountries] = useState([]);
  

  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country); 
    setPage(1); 
  }

  const handleBorderClick = (border) => {
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(border.toLowerCase())
    );
    setSelectedCountry(filtered[0]);  
  }


const Filter = (regions) => {
  setSelectedRegion(regions); 
}

const Suggestions = () => {
  return (
    <div className={`suggestion block-shadow ${isDarkMode ? "dark-theme dark-color" : "light-theme light-color"}`}>
    <ul>
      <li onClick={() => Filter("Africa")}>Africa</li>
      <li onClick={() => Filter("Americas")}>America</li>
      <li onClick={() => Filter("Asia")}>Asia</li>
      <li onClick={() => Filter("Europe")}>Europe</li>
      <li onClick={() => Filter("Oceania")}>Oceania</li>
    </ul>
  </div>
  )
}
  
  return (
    <div className={`App ${isDarkMode ? "very-dark-theme" : "very-light-theme"}`}>
      <div className={`content-wrapper ${isDarkMode ? "very-dark-theme" : "very-light-theme"}`}>
        <header className={` ${isDarkMode ? "dark-theme dark-color block-shadow" : "light-theme header-light-shadow light-color"}`}>
          <h1>Where in the world ?</h1>
          <div className="switch" onClick={handleToggleDarkMode}>
            <div className="moon">
            {isDarkMode ? (
              <i className="fa-solid fa-moon" style={{ color: '#ffffff' }}></i>
            ) : (
              <i className="fa-regular fa-moon" style={{ color: '#000000' }}></i>
            )}
            </div>
            <h4>Dark Mode</h4>
          </div>
        </header>
        <main>
        {pages === 0 ? (
            <>
              <Main Suggestions={Suggestions} setSearchQuery={setSearchQuery} isDarkMode={isDarkMode}/>
              <Countries isDarkMode={isDarkMode} handleCountryClick={handleCountryClick} />
            </>
          ) : (
            <Infos country={selectedCountry} handleBorderClick={handleBorderClick} setPage={setPage} setSearchQuery={setSearchQuery} isDarkMode={isDarkMode}/>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;