import { API, graphqlOperation } from "aws-amplify";
import "normalize.css";
import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Container from "../../components/container";
import Loader from "../../components/loader";
import MaposhRoutes from "../../service/router";
import { MaposhStore } from "../../service/store";
import Footer from "../footer";
import Header from "../header";

const maposhMapPromise = import("../map");
const MaposhMap = React.lazy(() => maposhMapPromise);
const Maposh: React.FunctionComponent<{ store: MaposhStore }> = props => {
  return (
    <React.Suspense fallback={<Loader />}>
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
    </React.Suspense>
  );
};

export default Maposh;
