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
import CityInput from "./common/cityInput";
import Measure from "./common/measure";
import SelectView from "./common/selectView";

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
      const {
        weatherType,
        defaultCity,
        data,
        forecastData,
        selectedCity
      } = this.props;
      if (prevProps.weatherType !== weatherType) {
        let city = defaultCity;
        if (selectedCity) {
          if (data[selectedCity]) {
            city = data[selectedCity].name;
          } else if (forecastData[selectCity]) {
            city = forecastData[selectedCity].city.name;
          }
        }
        console.log("!!!", city);
        this.props.getData(city, weatherType);
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
    <div className="Container">
      <div className="HeaderContainer">
        <SelectView
          weatherType={weatherType}
          changeWeatherType={_changeWeatherType}
        />
        <CityInput getData={getData} />
        <Measure
          tempMeasure={tempMeasure}
          changeTempMeasure={_changeTempMeasure}
        />
      </div>

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
          tempMeasure={tempMeasure}
        />
      )}
    </div>
  )
);

export default App;
