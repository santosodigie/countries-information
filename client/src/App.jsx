import { useState } from "react";
import InputForm from "./inputform";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<InputForm />} />
      </Routes>
    </div>
  );
}

export default App;
