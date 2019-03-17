import { Authenticator, RequireNewPassword, SignOut } from "aws-amplify-react";
import * as React from "react";
import Confirmation from "../../containers/confirmation";
import { Login } from "../../containers/login";
import PasswordReset from "../../containers/password-reset";
import SignUp from "../../containers/signup";
import AuthenticatorTheme from "./authenticator.css";

const MaposhAuthenticator: React.FC = () => {
  return (
    <Authenticator
      //   federated={myFederatedConfig}
      theme={AuthenticatorTheme}
      hideDefault={true}
    >
      <Login
        //   federated={myFederatedConfig}
        override={"SignIn"}
      />
      <RequireNewPassword />
      <SignUp override={"SignUp"} />
      <Confirmation override={"ConfirmSignUp"} />
      <PasswordReset override={"ForgotPassword"} />
    </Authenticator>
  );
};

export default MaposhAuthenticator;
