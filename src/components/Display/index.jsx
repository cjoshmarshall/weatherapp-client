import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import WeatherContext from "../../context/WeatherProvider";
import { FaSearch } from "react-icons/fa";
import { FiRotateCw } from "react-icons/fi";
import { celsius, fahrenheit, kelvin } from "../../utils/temperature";

function Display() {
  const [city, setCity] = useState("");
  //   const [weather, setWeather] = useState([]);
  const [temp, setTemp] = useState(null);
  const [error, setError] = useState("");
  const { weather, setWeather } = useContext(WeatherContext);

  const handleChange = (e) => {
    const { value } = e.target;
    setCity(value);
    if (error !== "") return setError("");
  };

  const handleBlur = (e) => {
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:3006/api/weather/${city}`);
      if (res.data?.message !== "city not found") return setWeather(res.data);
      setError("Please Check City");
    } catch (err) {
      if (err?.response?.status === 404) return setError("Please Enter City");
    }
  };

  const temperature = weather.main?.temp.toFixed();

  const handleTemp = (e) => {
    const { name, id } = e.target;
    if (name === "kelvin") {
      e.target.name = "fahrenheit";
      setTemp(fahrenheit(temperature) + "\u00B0F");
    }
    if (name === "fahrenheit") {
      e.target.name = "celsius";
      setTemp(celsius(temperature) + "\u00B0C");
    }
    if (name === "celsius") {
      e.target.name = "kelvin";
      setTemp(kelvin(temperature) + "K");
    }
    return temperature;
  };

  return (
    <div className="display-container">
      <div className="display-subcontainer">
        <form className="display-details-container display-form">
          <input
            type="text"
            name="display-search"
            className="display-search"
            value={city}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button
            className="display-button display-search-button"
            onClick={handleSubmit}
          >
            <FaSearch />
          </button>
        </form>
        <p className="display-error">{error}</p>

        <div className="display-innercontainer">
          <div className="display-details-container">
            <p className="display-details display-country">
              {weather.name}, {weather.sys?.country}
            </p>
          </div>
          <div className="display-details-container display-temperature-container">
            <div className="display-details-subcontainer">
              <p>Lat :</p>
              <p>{weather.coord?.lat}</p>
            </div>
            <div className="display-details-subcontainer">
              <p>Lon :</p>
              <p>{weather.coord?.lon}</p>
            </div>
          </div>
          <div className="display-details-container">
            <p className="display-details display-label">Temperature</p>
            <p className="display-details display-details-content display-icon-container">
              {temp || temperature}
              {!temp && "K"}
              <button
                name="kelvin"
                id="button"
                className="display-button display-rotate-button"
                onClick={handleTemp}
              >
                {"T\u00B0"}
              </button>
            </p>
          </div>
          <div className="display-details-container">
            <p className="display-details display-label">Humility</p>
            <p className="display-details display-details-content">
              {weather.main?.humidity}
            </p>
          </div>
          <div className="display-details-container">
            <p className="display-details display-label">Pressure</p>
            <p className="display-details display-details-content">
              {weather.main?.pressure}
            </p>
          </div>
          <div className="">
            <p className="display-details-container_outer">Wind</p>
            <div className="display-details-container">
              <p className="display-details display-label">Speed</p>
              <p className="display-details display-details-content">
                {weather.wind?.speed}
              </p>
            </div>
            <div className="display-details-container">
              <p className="display-details display-label">Degree</p>
              <p className="display-details display-details-content">
                {weather.wind?.deg}
                {"\u00B0"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Display;
