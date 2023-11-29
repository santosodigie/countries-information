import React, { useState, useEffect } from "react";

const CountriesList = () => {
  // countries is set to an empty array at first
  const [countries, setCountries] = useState([]);
  // while countries information has yet to be rendered loading will be set to true
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://countries-information-santos.onrender.com/countries")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setLoading(false); // once data has been loaded, loading will now be set to false
      })
      .catch((error) => {
        console.error("Error fetching countries: ", error);
        setLoading(false);
      });
  }, []);

  // if loading is true this message will be rendered
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {countries.map((country) => (
        <div key={country.name.common} className="country-info">
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Region: {country.region}</p>
          <p>Subregion: {country.subregion}</p>
          <img src={country.flags.png} />
        </div>
      ))}
    </div>
  );
};

export default CountriesList;
