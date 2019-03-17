import "normalize.css";
import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Container from "../../components/container";
import MaposhRoutes from "../../service/router";
import Footer from "../footer";
import Header from "../header";

const maposhMapPromise = import("../map");
const MaposhMap = React.lazy(() => maposhMapPromise);

const Maposh: React.FunctionComponent<{ store: any }> = props => {
  return (
    <Provider store={props.store}>
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
