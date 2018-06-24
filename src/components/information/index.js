import React, { Fragment } from "react";
import { compose, withPropsOnChange, withHandlers, pure } from "recompose";

import * as R from "ramda";
import moment from "moment";
const toCel = kelvin =>
  `${kelvin >= 273 ? "+" : "-"} ${(kelvin - 273).toFixed(2)} C`;

const toFar = kelvin =>
  `${kelvin >= 273 ? "+" : "-"} ${(kelvin * 9 / 5 - 459.67).toFixed(2)} F`;

const selectMeasure = (type, value) => {
  switch (type) {
    case "Fahrenheit":
      return toFar(value);
    case "Celcius":
      return toCel(value);
    default:
      return `${value.toFixed(2)} K`;
  }
};

const HOC = compose(
  withPropsOnChange(
    ["selectedCity", "data", "tempMeasure"],
    ({ data, selectedCity, tempMeasure }) => {
      if (R.isEmpty(selectedCity) || R.isEmpty(data)) {
        return {
          _title: null
        };
      } else {
        const city = data[selectedCity];
        if (city)
          return {
            _information: (
              <Fragment>
                <div>
                  {city.name} {city.sys.country}
                </div>
                <div>
                  <div>{city.weather[0].description}</div>
                  <img
                    src={`http://openweathermap.org/img/w/${
                      city.weather[0].icon
                    }.png`}
                    alt="icon"
                  />
                </div>
                <div>
                  temp: {selectMeasure(tempMeasure, city.main.temp)}&deg;
                </div>
                <div>
                  temp_min: {selectMeasure(tempMeasure, city.main.temp_min)}&deg;
                </div>
                <div>
                  temp_max: {selectMeasure(tempMeasure, city.main.temp_max)}&deg;
                </div>
                <div>pressure: {city.main.pressure} hPa</div>
                <div>humidity: {city.main.humidity} %</div>
                <div>{`sunrise: ${moment(
                  new Date(city.sys.sunrise * 1000)
                ).format("HH:MM")}`}</div>
                <div>{`sunset: ${moment(
                  new Date(city.sys.sunset * 1000)
                ).format("HH:MM")}`}</div>
                {city.wind.speed && (
                  <div>wind speed: {city.wind.speed} mps</div>
                )}
                {city.wind.deg && <div>wind degree: {city.wind.deg}&deg;</div>}
              </Fragment>
            )
          };
      }
    }
  ),
  pure
);

const history = HOC(({ _information }) => (
  <div className="information">{_information}</div>
));

history.propTypes = {};

export default history;