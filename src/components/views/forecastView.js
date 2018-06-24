import React from "react";

import { compose, defaultProps, withPropsOnChange, pure } from "recompose";

import {
  isEmpty,
  groupBy,
  map,
  mapObjIndexed,
  tap,
  pipe,
  values,
  head
} from "ramda";

import { selectMeasure } from "../../utils";

const HOC = compose(
  defaultProps({
    _defaultData: {
      city: {},
      list: []
    }
  }),
  withPropsOnChange(
    ["forecastData", "selectedCity"],
    ({ forecastData, selectedCity, _defaultData }) => {
      if (isEmpty(forecastData) || isEmpty(selectedCity)) {
        return {
          _data: _defaultData
        };
      }
      return {
        _data: forecastData[selectedCity]
      };
    }
  ),
  withPropsOnChange(["_data", "tempMeasure"], ({ _data, tempMeasure }) => {
    if (_data)
      return {
        _title: `${_data.city.name} ${_data.city.country}`,
        _renderTitle: pipe(
          groupBy(item => item.dt_txt.slice(0, 10)),
          tap(x => console.log(x)),
          mapObjIndexed((item, key) => (
            <div className="ForecastContainer" key={key}>
              <div className="ForecastDayTitle">{key}</div>
              <div className="ForecastDaysContainer">
                {map(
                  day => (
                    <div className="ForecastDay" key={day.dt}>
                      <div>time: {day.dt_txt.slice(10, 16)}</div>
                      <img
                        src={`https://openweathermap.org/img/w/${
                          head(day.weather).icon
                        }.png`}
                        alt={head(day.weather).icon}
                      />

                      <div>
                        temp: {selectMeasure(tempMeasure, day.main.temp)}&deg;
                      </div>
                      <div>humidity: {day.main.humidity} %</div>
                      <div>pressure: {parseInt(day.main.pressure, 10)} hPa</div>

                      <div>wind speed: {day.wind.speed} mps</div>

                      <div>wind degree: {parseInt(day.wind.deg, 10)}&deg;</div>
                    </div>
                  ),
                  item
                )}
              </div>
            </div>
          )),
          values
        )(_data.list)
      };
  }),
  pure
);

const forecastView = HOC(({ _title, _renderTitle }) => (
  <div className="ForecastViewContainer">
    <div className="ForecastViewTitle">{_title}</div>
    <div>{_renderTitle}</div>
  </div>
));

forecastView.propTypes = {};

export default forecastView;
