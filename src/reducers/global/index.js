import { createReducer } from "../../utils/";
import t from "./types";
// initial State
const initialState = {
  selectedCity: "",
  OneDayData: {},
  ForecastData: {},
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
    console.log("fail");
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
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
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
    console.log("fail");
    return {
      ...state,
      isLoading: false
    };
  }
});
