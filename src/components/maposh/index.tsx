import { Router } from "@reach/router";
import "normalize.css";
import * as React from "react";
import { Provider } from "react-redux";
import configureStore from "../../store";
import Container from "../container";
import { Footer } from "../footer/footer";
import { Header } from "../header";
import Map from "../map";
import About from "../pages/about";
import { Content } from "./maposh.css";

const store = configureStore();

const Maposh: React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      <Container>
        <Header />
        <Router component={Content}>
          <Map path="/" />
          <About path="/about" />
        </Router>
        <Footer />
      </Container>
    </Provider>
  );
};

export default Maposh;
