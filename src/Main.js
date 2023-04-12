import react, { useState, useEffect, useRef } from 'react';
import './App.css';


function Main({ Suggestions, setSearchQuery, isDarkMode }){
    const [suggestion, showSuggestion] = useState(false);
    const toggleSuggestion = () => {
        showSuggestion(!suggestion);
      };
      const filterRef = useRef(null);

      useEffect(() => {
        const handleClick = (event) => {
          if (
            suggestion &&
            !event.target.closest('.suggestion-container') &&
            event.target !== filterRef.current &&
            !filterRef.current.contains(event.target)
          ) {
            showSuggestion(false);
          }
        };
      
        document.addEventListener('click', handleClick);
      
        return () => {
          document.removeEventListener('click', handleClick);
        };
      }, [suggestion]);
      

    return (
        <div className="main-page">
            <div className="search">
                <div className={`input-wrapper block-shadow ${isDarkMode ? "dark-theme" : "light-theme"}`}>
                    <div className={`icon-wrapper ${isDarkMode ? "dark-theme" : "light-theme"}`}>
                        <i className="fa-solid fa-magnifying-glass" style={{ color: !isDarkMode ? 'hsl(0, 0%, 52%)' : '#ffffff' }}></i>
                    </div>
                    <input className={`search-input ${isDarkMode ? "dark-theme dark-color" : "light-theme light-color"}`} placeholder="Search for a country..."onChange={(e) => setSearchQuery(e.target.value)}></input>
                </div>
                <div className="filter-wrapper">
                <div className={`filter block-shadow ${isDarkMode ? "dark-theme dark-color" : "light-theme light-color"}`} onClick={toggleSuggestion} ref={filterRef}>
                    <h5>Filter by Region</h5>
                    <i className="fa-solid fa-chevron-down" style={{ color: !isDarkMode ? '#000' : '#ffffff' }}></i>
                </div>
                {suggestion ? <Suggestions/> : null}

                </div>

            </div>
            
        </div>

    )
}

export default Main; 