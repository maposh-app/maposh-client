import * as React from "react";
import { connect } from "react-redux";
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
  Switch
} from "react-router-dom";
import LoginModal from "../../containers/login";
import About from "../../containers/pages/about";
import SignupModal from "../../containers/signup";
import { getQuerystring } from "../../utils/extract";
import { MaposhState } from "../store";
import { ISystemState } from "../store/system/types";

interface ISystemRouteProps {
  system: ISystemState;
}

const UnauthenticatedRedirectComponent: React.FC<RouteComponentProps> = ({
  location
}) => {
  return (
    <Redirect to={`login?redirect=${location.pathname}${location.search}`} />
  );
};

export const BaseAuthenticatedRoute: React.FC<
  RouteProps & ISystemRouteProps
> = ({ component, system, location, ...rest }) => {
  const { isAuthenticated } = system;
  return (
    <Route
      {...rest}
      component={isAuthenticated ? component : UnauthenticatedRedirectComponent}
    />
  );
};

const AuthenticatedRedirectComponent: React.FC<RouteComponentProps> = ({
  location
}) => {
  const redirect = getQuerystring("redirect");
  return <Redirect to={`redirect`} />;
};

export const BaseUnauthenticatedRoute: React.FC<
  RouteProps & ISystemRouteProps
> = ({ component, system, location, ...rest }) => {
  const { isAuthenticated } = system;
  return (
    <Route
      {...rest}
      component={!isAuthenticated ? component : AuthenticatedRedirectComponent}
    />
  );
};

const mapStateToProps = (state: MaposhState) => ({
  system: state.system
});

export const AuthenticatedRoute = connect(mapStateToProps)(
  BaseAuthenticatedRoute
);

export const UnauthenticatedRoute = connect(mapStateToProps)(
  BaseUnauthenticatedRoute
);

const MaposhRoutes: React.FC = () => (
  <Switch>
    <Route path="/about" component={About} />
    <UnauthenticatedRoute path="/signup" component={SignupModal} />
    <UnauthenticatedRoute path="/login" component={LoginModal} />
  </Switch>
);

export default MaposhRoutes;
