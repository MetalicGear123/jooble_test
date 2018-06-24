import React from "react";
import { compose, withHandlers, withStateHandlers, pure } from "recompose";
import { func, string } from "prop-types";
import { isEmpty } from "ramda";

const HOC = compose(
  withStateHandlers(
    {
      city: ""
    },
    {
      _onChange: () => e => ({
        city: e.target.value
      }),
      resetCity: () => () => ({
        city: ""
      })
    }
  ),
  withHandlers({
    _onSubmit: ({ city, resetCity, getData, weatherType }) => e => {
      e.preventDefault();
      if (isEmpty(city)) {
      } else {
        getData(city, weatherType);
        resetCity();
      }
    }
  }),
  pure
);

const cityInput = HOC(({ city, _onSubmit, _onChange }) => (
  <form className="CityInputContainer" onSubmit={_onSubmit}>
    <button type="submit">Find City</button>
    <input value={city} onChange={_onChange} type="text" />
  </form>
));

cityInput.propTypes = {
  city: string,
  _onSubmit: func,
  _onChange: func
};

export default cityInput;
