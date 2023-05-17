import React, { useContext } from "react";
import "./index.css";
import WeatherContext from "../../context/WeatherProvider";
import { celsius } from "../../utils/temperature";

function Conditions() {
  const { weather } = useContext(WeatherContext);
  const temp = +celsius(weather.main?.temp.toFixed(2));
  return (
    <div className="conditions-container">
      <h2 className="conditions-main">
        {weather.weather?.map((item) => item.main)}
      </h2>
      <h2 className="conditions-temperature">{`${temp}\u00B0C`}</h2>
    </div>
  );
}

export default Conditions;
