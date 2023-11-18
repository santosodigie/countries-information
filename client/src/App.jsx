import InputForm from "./InputForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<InputForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
