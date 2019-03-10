import "normalize.css";
import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
      <Router>
        <Container>
          <Header />
          <Content>
            <Route path="/" component={Map} />
            <Route path="/about" component={About} />
          </Content>
          <Footer />
        </Container>
      </Router>
    </Provider>
  );
};

export default Maposh;
