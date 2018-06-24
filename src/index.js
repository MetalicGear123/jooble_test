import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store";

import App from "./components/App";
const store = configureStore();

const renderApp = Component =>
  render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById("root")
  );
renderApp(App);
