import React, { Fragment } from "react";
import { compose, withPropsOnChange, withHandlers, pure } from "recompose";

import * as R from "ramda";

const HOC = compose(pure);

const history = HOC(({ tempMeasure, changeTempMeasure }) => (
  <div className="MeasureContainer">
    <span>Change temp measure</span>
    <select value={tempMeasure} onChange={changeTempMeasure}>
      <option value="Kelvin">Kelvin</option>
      <option value="Fahrenheit">Fahrenheit</option>
      <option value="Celcius">Celcius</option>
    </select>
  </div>
));

history.propTypes = {};

export default history;
