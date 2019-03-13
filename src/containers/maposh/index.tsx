import "normalize.css";
import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from "../../components/container";
import MaposhRoutes from "../../service/router";
import configureStore from "../../service/store";
import { Footer } from "../footer";
import Header from "../header";
import MaposhMap from "../map";
const store = configureStore();

const Maposh: React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      <Router>
        <Container>
          <Header />
          <MaposhMap />
          <MaposhRoutes />
          <Footer />
        </Container>
      </Router>
    </Provider>
  );
};

export default Maposh;
