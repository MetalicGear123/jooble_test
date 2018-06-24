import React from "react";
import { compose, pure } from "recompose";
import { func, string } from "prop-types";
const HOC = compose(pure);

const selectView = HOC(({ weatherType, changeWeatherType }) => (
  <div className="ViewConfigContainer">
    <span>Choose View Type</span>
    <button
      value="weather"
      onClick={changeWeatherType}
      className={weatherType === "weather" ? "active" : ""}
    >
      Now
    </button>
    <button
      value="forecast"
      onClick={changeWeatherType}
      className={weatherType === "forecast" ? "active" : ""}
    >
      For 5 days
    </button>
  </div>
));

selectView.propTypes = {
  changeWeatherType: func.isRequired,
  weatherType: string.isRequired
};

export default selectView;
