import React from "react";

import { compose, defaultProps, withPropsOnChange, pure } from "recompose";

import { isEmpty, groupBy, map, mapObjIndexed, tap, pipe, values } from "ramda";
import moment from "moment";
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
  withPropsOnChange(["_data"], ({ _data }) => {
    return {
      _title: `${_data.city.name} ${_data.city.country}`,
      _renderTitle: pipe(
        groupBy(item => moment(item.dt * 1000).format("YYYY-MM-DD")),
        mapObjIndexed((item, key) => (
          <div>
            <div>{key}</div>
          </div>
        )),
        values
      )(_data.list)
    };
  }),
  pure
);

const forecastView = HOC(({ _title, _renderTitle }) => (
  <div>
    {_title}
    <div>{_renderTitle}</div>
  </div>
));

forecastView.propTypes = {};

export default forecastView;
