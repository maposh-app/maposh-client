import {
  Authenticator,
  ConfirmSignIn,
  ConfirmSignUp,
  ForgotPassword,
  Loading,
  RequireNewPassword,
  SignUp,
  TOTPSetup,
  VerifyContact
} from "aws-amplify-react";
import * as React from "react";
import { Login } from "../../containers/login";
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
        override={"Signin"}
      />
      <ConfirmSignIn />
      <RequireNewPassword />
      <SignUp />
      <ConfirmSignUp />
      <VerifyContact />
      <ForgotPassword />
      <TOTPSetup />
      <Loading />
    </Authenticator>
  );
};

export default MaposhAuthenticator;
