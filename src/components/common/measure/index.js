import React from "react";
import { compose, pure } from "recompose";

import { func, string } from "prop-types";

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

history.propTypes = {
  changeTempMeasure: func.isRequired,
  tempMeasure: string.isRequired
};

export default history;
