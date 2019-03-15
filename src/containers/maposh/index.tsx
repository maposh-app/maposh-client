import { Auth } from "aws-amplify";
import { Authenticator } from "aws-amplify-react";
import "normalize.css";
import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Container from "../../components/container";
import MaposhRoutes from "../../service/router";
import configureStore from "../../service/store";
import { updateUserStatus } from "../../service/store/system/actions";
import Footer from "../footer";
import Header from "../header";
const store = configureStore();

const maposhMapPromise = import("../map");
const MaposhMap = React.lazy(() => maposhMapPromise);

const Maposh: React.FunctionComponent = () => {
  React.useEffect(() => {
    const isUserAuthenticated = async () => {
      Auth.currentAuthenticatedUser().then(user =>
        store.dispatch(updateUserStatus({ isAuthenticated: user !== null }))
      );
    };
    isUserAuthenticated();
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Container>
          <Header />
          <MaposhMap />
          <MaposhRoutes />
          <Footer />
        </Container>
      </Router>
    </Provider>
  );
};

export default Maposh;
