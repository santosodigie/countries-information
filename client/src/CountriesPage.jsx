import React, { useState } from "react";
import InputForm from "./InputForm";

function CountriesPage() {
  const [countryData, setCountryData] = useState(null);
  const [error, setError] = useState("");

  // takes in input from the user and makes a request to the backend to retrieve information about the country the user entered
  const handleSearch = async (name) => {
    setError("");
    setCountryData(null);
    try {
      const response = await fetch(
        `https://countries-information-santos.onrender.com/country/${name}`
      );
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
              <p>Continents: {countryData[0].continents}</p>
              <p>Population: {countryData[0].population.toLocaleString()}</p>
              <div>
                <h4>Currencies:</h4>
                {Object.values(countryData[0].currencies).map((currency) => (
                  <p
                    key={currency.name}
                  >{`${currency.name} (${currency.symbol})`}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CountriesPage;
