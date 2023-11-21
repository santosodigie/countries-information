import React, { useState } from "react";

function InputForm({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents default form submit action
    onSearch(inputValue);
  };

  return (
    <div className="wrap">
      <form className="search" onSubmit={handleSubmit}>
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="What are you looking for?"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type="submit" className="searchButton">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default InputForm;
