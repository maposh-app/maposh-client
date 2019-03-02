import "normalize.css";
import { Suspense } from "react";
import * as React from "react";
import { Provider } from "react-redux";
import Spinner from "react-spinkit";
import configureStore from "../../store";
import Container from "../container";
import { Header } from "../header";
import Map from "../map";

const store = configureStore();

class Maposh extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Suspense fallback={<Spinner name="rotating-plane" />}>
          <Container>
            <Header />
            <Map />
          </Container>
        </Suspense>
      </Provider>
    );
  }
}

export default Maposh;
