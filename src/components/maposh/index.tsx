import "normalize.css";
import * as React from "react";
import { Provider } from "react-redux";
import configureStore from "../../store";
import Container from "../container";
import { Footer } from "../footer/footer";
import { Header } from "../header";
import Map from "../map";

const store = configureStore();

const Maposh: React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      <Container>
        <Header />
        <Map />
        <Footer />
      </Container>
    </Provider>
  );
};

export default Maposh;
