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
