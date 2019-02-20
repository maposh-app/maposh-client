import * as React from "react";

import "./App.css";
import Container from "./components/container/container";
import { Header } from "./components/header/header";
import Map from "./components/map/map";

class App extends React.Component {
  public render() {
    return (
      <Container>
        <Header />
        <Map />
      </Container>
    );
  }
}

export default App;
