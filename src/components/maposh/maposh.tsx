import * as React from "react";

import Container from "../container/container";
import { Header } from "../header/header";
import Map from "../map/map";
import "./maposh.css";

class Maposh extends React.Component {
  public render() {
    return (
      <Container>
        <Header />
        <Map />
      </Container>
    );
  }
}

export default Maposh;
