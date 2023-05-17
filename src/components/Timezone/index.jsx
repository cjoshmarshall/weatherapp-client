import React, { useEffect, useState } from "react";
import "./index.css";

function Timezone() {
  const [time, setTime] = useState("Loading...");

  const date = new Date();
  const day = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
  }).format(date);
  const clock = new Intl.DateTimeFormat("en-GB", {
    timeStyle: "full",
  }).format(date);

  useEffect(() => {
    let timeInterval = setInterval(() => {
      setTime(clock);
    }, 1000);
    return () => clearInterval(timeInterval);
  }, [clock]);

  return (
    <div className="timezone-container">
      <p className="timezone-time">{time.split(" ")[0]}</p>
      <p className="timezone-day">{day}</p>
    </div>
  );
}

export default Timezone;
