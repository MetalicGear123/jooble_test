import React from "react";
import { compose, pure } from "recompose";

//components
import SearchHistory from "../history";
import Information from "../information";

const HOC = compose(pure);

const App = HOC(({ data, tempMeasure, getData, selectCity, selectedCity }) => (
  <div>
    <div className="container">
      <Information
        selectedCity={selectedCity}
        data={data}
        tempMeasure={tempMeasure}
      />
      <SearchHistory
        selectedCity={selectedCity}
        selectCity={selectCity}
        data={data}
      />
    </div>
  </div>
));

export default App;
