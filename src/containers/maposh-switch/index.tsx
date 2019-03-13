import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Container from "../../components/container";
import { Footer } from "../footer";
import { Header } from "../header";
import Map from "../map";
import About from "../pages/about";
import EnhancedSignupModal from "../signup";
import { Content } from "./maposh-switch.css";

const MaposhSwitch: React.FC = () => {
  return (
    <Container>
      <Header />
      <Switch>
        <Content>
          <Route path="/" component={Map} />
          <Route path="/about" component={About} />
          <Route path="/signup" component={EnhancedSignupModal} />
        </Content>
      </Switch>
      <Footer />
    </Container>
  );
};

export default MaposhSwitch;
