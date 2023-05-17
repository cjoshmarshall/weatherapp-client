import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import axios from "axios";

import Timezone from "../../components/Timezone";
import Display from "../../components/Display";
import Conditions from "../../components/Conditions";
import WeatherContext from "../../context/WeatherProvider";
import Loader from "../../components/Loader";

const sunnyImage = require("../../assets/images/sunny.jpg");
const rainyImage = require("../../assets/images/rainy.jpg");
const hazyImage = require("../../assets/images/hazy.jpg");

function Home() {
  const { weather, setWeather } = useContext(WeatherContext);
  const [backgroundImage, setBackgroundImage] = useState("");

  const weatherArr = weather.weather || [];
  const main = weatherArr.length > 0 ? weatherArr[0].main : "";

  useEffect(() => {
    if (main === "Haze" || "Fog") {
      setBackgroundImage(`url(${hazyImage})`);
    }
    if (main === "Clouds") {
      setBackgroundImage(`url(${rainyImage})`);
    }
    if (main === "Clear") {
      setBackgroundImage(`url(${sunnyImage})`);
    }
  }, [weather]);

  useEffect(() => {
    let region = Intl.DateTimeFormat()?.resolvedOptions()?.timeZone?.split("/");
    let initialCity = region[region.length - 1];
    const intialCity = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3006/api/weather/${initialCity}`
        );
        setWeather(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    intialCity();
  }, []);

  return weather.length === 0 ? (
    <div className="home-loader">
      <Loader />
    </div>
  ) : (
    <div
      className="home-container"
      id="home-container"
      style={{
        background: backgroundImage,
        backgroundSize: "cover",
      }}
    >
      <Display />
      <div className="home-subcontainer">
        <Conditions />
        <Timezone />
      </div>
    </div>
  );
}

export default Home;
