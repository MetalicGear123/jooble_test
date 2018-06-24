import { createReducer } from "../../utils/";
import t from "./types";
// initial State
const initialState = {
  selectedCity: "",
  OneDayData: {},
  ForecastData: {},
  history: {},
  mess: ""
};

export default createReducer(initialState, {
  [`${t.SELECT_CITY}`](state, action) {
    return {
      ...state,
      selectedCity: action.id
    };
  },
  [`${t.NOTIFY}`](state, action) {
    return {
      ...state,
      mess: action.mess
    };
  },
  [`${t.GET_WEATHER}_REQUEST`](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [`${t.GET_WEATHER}_SUCCESS`](state, action) {
    if (action.payload) {
      return {
        ...state,
        isLoading: false,
        history: {
          ...state.history,
          [action.payload.id]: {
            name: action.payload.name,
            id: action.payload.id
          }
        },
        OneDayData: {
          ...state.OneDayData,
          [action.payload.id]: action.payload
        }
      };
    }
    return {
      ...state,
      isLoading: false
    };
  },
  [`${t.GET_WEATHER}_FAILURE`](state, action) {
    return {
      ...state,
      isLoading: false
    };
  },
  [`${t.GET_FORECAST}_REQUEST`](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [`${t.GET_FORECAST}_SUCCESS`](state, action) {
    if (action.payload) {
      return {
        ...state,
        isLoading: false,
        history: {
          ...state.history,
          [action.payload.city.id]: {
            name: action.payload.city.name,
            id: action.payload.city.id
          }
        },
        ForecastData: {
          ...state.ForecastData,
          [action.payload.city.id]: action.payload
        }
      };
    }
    return {
      ...state,
      isLoading: false
    };
  },
  [`${t.GET_FORECAST}_FAILURE`](state, action) {
    return {
      ...state,
      isLoading: false
    };
  }
});
