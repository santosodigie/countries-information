import React, { useState } from "react";
import InputForm from "./InputForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountriesList from "./CountriesList";
import CountriesPage from "./CountriesPage";

import "./App.css";

function App() {
  const [showCountries, setShowCountries] = useState(false);

  const handleToggleCountries = () => {
    setShowCountries(!showCountries);
  };

  return (
    <>
      <div className="container">
        <CountriesPage />
        <button className="button" onClick={handleToggleCountries}>
          {showCountries ? "Hide Countries" : "Show all Countries"}
        </button>
        {showCountries && <CountriesList />}
        {/* <InputForm />
      <CountriesList /> */}
      </div>
    </>
  );
}

export default App;
