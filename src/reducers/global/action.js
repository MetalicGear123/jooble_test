import t from "./types";
import Api from "../../api/index";

// https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}

export const selectCity = id => ({
  type: t.SELECT_CITY,
  id
});

export const Notify = mess => ({
  type: t.NOTIFY,
  mess
});

export const getData = (city, type) => dispatch =>
  dispatch({
    type: t[`GET_${type.toUpperCase()}`],
    payload: Api(type)
      .get(city)
      .then(res => {
        if (type === "weather") {
          if (res.id) {
            dispatch(selectCity(res.id));
            return res;
          }
        }
        if (type === "forecast") {
          if (res.city && res.city.id) {
            dispatch(selectCity(res.city.id));
            return res;
          }
        }
        dispatch(Notify("Error in City value"));
        setTimeout(() => dispatch(Notify("")), 3000);
        return null;
      })
  });
