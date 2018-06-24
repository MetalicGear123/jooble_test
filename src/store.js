import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";

import error from "./middleware/error";
import promiseMiddleware from "./middleware/promiseMiddleware";
import thunk from "redux-thunk";
// main reducer
import reducer from "./reducers";

export default (initialState = {}) => {
  const middlewares = [promiseMiddleware(), error, thunk];

  if (process.env.NODE_ENV === "development") {
    middlewares.push(
      createLogger({
        collapsed: true
      })
    );
  }

  const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
      : compose;

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  const store = createStore(reducer, initialState, enhancer);

  if (process.env.NODE_ENV === "development") {
    if (module.hot) {
      // eslint-disable-next-line
      module.hot.accept("./reducers", () =>
        store.replaceReducer(require("./reducers").default)
      );
    }
  }

  return store;
};
