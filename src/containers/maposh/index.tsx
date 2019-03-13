import "normalize.css";
import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import configureStore from "../../service/store";
import MaposhSwitch from "../maposh-switch";

const store = configureStore();

const Maposh: React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route component={MaposhSwitch} />
      </Router>
    </Provider>
  );
};

export default Maposh;
