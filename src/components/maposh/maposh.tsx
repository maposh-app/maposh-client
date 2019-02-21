import * as React from "react";

import 'normalize.css';
import Container from "../container/container";
import { Header } from "../header/header";
import Map from "../map/map";

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
