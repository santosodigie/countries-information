import InputForm from "./InputForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountriesList from "./CountriesList";

import "./App.css";

function App() {
  return (
    <>
      <h1> All Countries</h1>
      <CountriesList />
    </>
  );
}

export default App;
