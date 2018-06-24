import React from "react";
import { compose, pure } from "recompose";

//components
import Information from "../information";

const HOC = compose(pure);

const App = HOC(({ data, tempMeasure, getData, selectCity, selectedCity }) => (
  <div className="container">
    <Information
      selectedCity={selectedCity}
      data={data}
      tempMeasure={tempMeasure}
    />
  </div>
));

export default App;
