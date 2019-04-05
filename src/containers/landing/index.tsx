import * as React from "react";
import { Provider } from "react-redux";
import Container from "../../components/container";
import Loader from "../../components/loader";
import MaposhStore from "../../service/store";
import Landing from "./landing";

const MaposhLanding: React.FC = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <Provider store={MaposhStore}>
        <Container>
          <Landing />
        </Container>
      </Provider>
    </React.Suspense>
  );
};

export default MaposhLanding;
