import * as R from "ramda";

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers[action.type]) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

// helper isPromise
export function isPromise(value) {
  if (value !== null && typeof value === "object") {
    return value && typeof value.then === "function";
  }

  return false;
}

export function oneOf(actual, expected) {
  if (Array.isArray(expected)) {
    return new Error(
      "Invalid argument supplied to oneOfType: expected an instance of array"
    );
  }

  if (R.filter(value => R.equals(actual, value), expected).length === 0) {
    return false;
  }

  return true;
}

const toCel = kelvin =>
  `${kelvin >= 273 ? "+" : "-"} ${(kelvin - 273).toFixed(2)} C`;

const toFar = kelvin =>
  `${kelvin >= 273 ? "+" : "-"} ${(kelvin * 9 / 5 - 459.67).toFixed(2)} F`;

export const selectMeasure = (type, value) => {
  switch (type) {
    case "Fahrenheit":
      return toFar(value);
    case "Celcius":
      return toCel(value);
    default:
      return `${value.toFixed(2)} K`;
  }
};
