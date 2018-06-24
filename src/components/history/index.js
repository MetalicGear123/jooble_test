import React from "react";
import { compose, withPropsOnChange, withHandlers, pure } from "recompose";

import * as R from "ramda";

const HOC = compose(
  withHandlers({
    _changeCity: ({ selectCity, selectedCity }) => id => () => {
      if (selectedCity !== id) selectCity(id);
    }
  }),
  withPropsOnChange(
    ["selectedCity", "data"],
    ({ selectedCity, data, _changeCity }) => ({
      _listOfCitys: R.pipe(
        R.values,
        R.map(item => (
          <div
            className={`list_item ${item.id === selectedCity ? "active" : ""}`}
            key={item.id}
            onClick={_changeCity(item.id)}
          >
            {item.name}
          </div>
        ))
      )(data)
    })
  ),
  pure
);

const history = HOC(({ _listOfCitys }) => (
  <div className="historyContainer">
    <div className="historyTitle">History</div>
    <div className="historyContent">{_listOfCitys}</div>
  </div>
));

history.propTypes = {};

export default history;
