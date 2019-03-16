import { Authenticator, RequireNewPassword, SignOut } from "aws-amplify-react";
import * as React from "react";
import Confirmation from "../../containers/confirmation";
import { Login } from "../../containers/login";
import PasswordReset from "../../containers/password-reset";
import Signup from "../../containers/signup";
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
      <Signup override={"SignUp"} />
      <Confirmation override={"ConfirmSignUp"} />
      <PasswordReset override={"ForgotPassword"} />
      <SignOut />
    </Authenticator>
  );
};

export default MaposhAuthenticator;
