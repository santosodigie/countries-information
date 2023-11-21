import InputForm from "./InputForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountriesList from "./CountriesList";
import CountriesPage from "./CountriesPage";

import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <CountriesPage />
        {/* <InputForm />
      <CountriesList /> */}
      </div>
    </>
  );
}

export default App;
