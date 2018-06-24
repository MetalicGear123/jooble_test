import React from "react";
import {
  compose,
  branch,
  pure,
  lifecycle,
  withStateHandlers,
  defaultProps,
  renderNothing
} from "recompose";
import { connect } from "react-redux";

//action
import { getData, selectCity } from "../reducers/global/action";

//style
import "./style.css";

//components
import OneDayWeather from "./views/oneDayView.js";
import ForecastWeather from "./views/forecastView.js";
import CityInput from "./cityInput";
import Measure from "./measure";

const HOC = compose(
  defaultProps({
    defaultCity: "Kiev"
  }),
  connect(
    ({ global }) => ({
      data: global.OneDayData,
      forecastData: global.ForecastData,
      isLoading: global.isLoading,
      selectedCity: global.selectedCity
    }),
    {
      getData,
      selectCity
    }
  ),
  withStateHandlers(
    {
      tempMeasure: "Kelvin",
      weatherType: "forecast"
    },
    {
      _changeTempMeasure: () => e => ({
        tempMeasure: e.target.value
      }),
      _changeWeatherType: () => e => ({
        weatherType: e.target.value
      })
    }
  ),
  lifecycle({
    componentDidMount() {
      const { defaultCity, weatherType } = this.props;
      this.props.getData(defaultCity, weatherType);
    },
    componentDidUpdate(prevProps) {
      const { weatherType, defaultCity } = this.props;
      if (prevProps.weatherType !== weatherType) {
        this.props.getData(defaultCity, weatherType);
      }
    }
  }),
  branch(({ isLoading }) => isLoading, renderNothing),
  pure
);

const App = HOC(
  ({
    data,
    tempMeasure,
    getData,
    selectCity,
    selectedCity,
    weatherType,
    forecastData,
    _changeTempMeasure,
    _changeWeatherType
  }) => (
    <div>
      <div>
        <div>View Type</div>
        <div>
          <input
            onChange={_changeWeatherType}
            name="viewType"
            value="weather"
            checked={weatherType === "weather"}
            type="radio"
          />
          <span>Now</span>
        </div>
        <div>
          <input
            onChange={_changeWeatherType}
            name="viewType"
            value="forecast"
            checked={weatherType === "forecast"}
            type="radio"
          />
          <span>For 5 lays</span>
        </div>
      </div>
      <CityInput getData={getData} />
      <Measure
        tempMeasure={tempMeasure}
        changeTempMeasure={_changeTempMeasure}
      />
      {weatherType === "weather" ? (
        <OneDayWeather
          data={data}
          selectedCity={selectedCity}
          getData={getData}
          selectCity={selectCity}
          tempMeasure={tempMeasure}
        />
      ) : (
        <ForecastWeather
          selectedCity={selectedCity}
          forecastData={forecastData}
        />
      )}
    </div>
  )
);

export default App;
