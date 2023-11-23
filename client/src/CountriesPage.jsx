import React, { useState } from "react";
import InputForm from "./inputform";

function CountriesPage() {
  const [countryData, setCountryData] = useState(null);
  const [error, setError] = useState("");

  // takes in input from the user and makes a request to the backend to retrieve information about the country the user entered
  const handleSearch = async (name) => {
    setError("");
    setCountryData(null);
    try {
      const response = await fetch(`http://localhost:3001/country/${name}`);
      if (!response.ok) {
        throw new Error("Country not found");
      }
      const data = await response.json(); // converts data to json
      setCountryData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setCountryData(null);
      setError("Country not found. Try another search");
    }
  };

  return (
    <>
      <div className="container">
        <InputForm onSearch={handleSearch} />
        {error && <div class="alert">{error}</div>}
        {countryData && (
          <div className="wrapper">
            <img src={countryData[0].flags.png} />
            <div className="text-box">
              <h2>{countryData[0].name.common}</h2>
              <p>Capital: {countryData[0].capital}</p>
              <p>Region: {countryData[0].region}</p>
              <p>Subregion: {countryData[0].subregion}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CountriesPage;
