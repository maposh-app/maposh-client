import "normalize.css";
import { Suspense } from "react";
import * as React from "react";
import Spinner from "react-spinkit";
import Container from "../container";
import { Header } from "../header";
import Map from "../map";

class Maposh extends React.Component {
  public render() {
    return (
      <Suspense fallback={<Spinner name="rotating-plane" />}>
        <Container>
          <Header />
          <Map />
        </Container>
      </Suspense>
    );
  }
}

export default Maposh;
