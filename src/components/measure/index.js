import React, { Fragment } from "react";
import { compose, withPropsOnChange, withHandlers, pure } from "recompose";

import * as R from "ramda";

const HOC = compose(pure);

const history = HOC(({ tempMeasure, changeTempMeasure }) => (
  <Fragment>
    <div>select temperature measure</div>
    <select value={tempMeasure} onChange={changeTempMeasure}>
      <option value="Kelvin">Kelvin</option>
      <option value="Fahrenheit">Fahrenheit</option>
      <option value="Celcius">Celcius</option>
    </select>
  </Fragment>
));

history.propTypes = {};

export default history;
