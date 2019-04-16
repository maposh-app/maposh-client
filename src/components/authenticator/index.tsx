import { Authenticator, RequireNewPassword } from "aws-amplify-react";
import * as React from "react";
import Confirmation from "../../containers/confirmation";
import { Login } from "../../containers/login";
import PasswordReset from "../../containers/password-reset";
import SignUp from "../../containers/signup";
import AuthenticatorTheme from "./authenticator.css";

const federatedConfig = {
  facebook_app_id: process.env.REACT_APP_FACEBOOK_APP_ID || ""
};
const MaposhAuthenticator: React.FC = () => {
  return (
    <Authenticator
      federated={federatedConfig}
      theme={AuthenticatorTheme}
      hideDefault={true}
    >
      <Login federated={federatedConfig} override={"SignIn"} />
      <RequireNewPassword />
      <SignUp override={"SignUp"} />
      <Confirmation override={"ConfirmSignUp"} />
      <PasswordReset override={"ForgotPassword"} />
    </Authenticator>
  );
};

export default MaposhAuthenticator;
