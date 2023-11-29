import React, { useState } from "react";
import CountriesList from "./CountriesList";
import CountriesPage from "./CountriesPage";
import TopOfPage from "./TopOfPage";

import "./App.css";

function App() {
  const [showCountries, setShowCountries] = useState(false);

  const handleToggleCountries = () => {
    setShowCountries(!showCountries);
  };

  return (
    <>
      <TopOfPage />
      <div className="container">
        <CountriesPage />
        <button className="button" onClick={handleToggleCountries}>
          {showCountries ? "Hide Countries" : "Show all Countries"}
        </button>
        {showCountries && <CountriesList />}
      </div>
    </>
  );
}

export default App;
