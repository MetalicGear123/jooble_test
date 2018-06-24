import React from "react";
import { compose, withPropsOnChange, withHandlers, pure } from "recompose";

import * as R from "ramda";

const HOC = compose(
  withHandlers({
    _changeCity: ({ selectCity, selectedCity }) => e => {
      if (selectedCity !== e.target.value) selectCity(e.target.value);
    }
  }),
  withPropsOnChange(
    ["selectedCity", "data"],
    ({ selectedCity, data, _changeCity }) => {
      return {
        _listOfCitys: R.pipe(
          R.values,
          R.map(item => (
            <option
              className={`list_item ${
                item.id === selectedCity ? "active" : ""
              }`}
              key={item.id}
              value={item.id}
            >
              {item.name}
            </option>
          ))
        )(data)
      };
    }
  ),
  pure
);

const history = HOC(({ selectedCity, _listOfCitys, _changeCity, _data }) => (
  <div className="historyContainer">
    <div className="historyTitle">History</div>
    <select
      value={selectedCity}
      onChange={_changeCity}
      className="historyContent"
    >
      {_listOfCitys}
    </select>
  </div>
));

history.propTypes = {};

export default history;
