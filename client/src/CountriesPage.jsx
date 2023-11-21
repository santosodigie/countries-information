import React, { useState } from "react";
import InputForm from "./inputform";

function CountriesPage() {
  const [countryData, setCountryData] = useState(null);
  // takes in input from the user and makes a request to the backend to retrieve information about the country the user entered
  const handleSearch = async (name) => {
    try {
      const response = await fetch(`http://localhost:3001/country/${name}`);
      const data = await response.json(); // converts data to json
      setCountryData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setCountryData(null);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Countries Search</h1>

        <InputForm onSearch={handleSearch} />
        {countryData && (
          <div className="country-info">
            <h2>{countryData[0].name.common}</h2>
            <p>Capital: {countryData[0].capital}</p>
            <p>Region: {countryData[0].region}</p>
            <p>Subregion: {countryData[0].subregion}</p>
            <img src={countryData[0].flags.png} />
          </div>
        )}
      </div>
    </>
  );
}

export default CountriesPage;
