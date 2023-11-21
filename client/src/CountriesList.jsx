import React, { useState, useEffect } from "react";

const CountriesList = () => {
  // countries is set to an empty array at first
  const [countries, setCountries] = useState([]);
  // while countries information has yet to be rendered loading will be set to true
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/countries")
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
    <ul>
      {countries.map((country) => (
        <li key={country.name.common}>{country.name.common}</li>
      ))}
    </ul>
  );
};

export default CountriesList;
