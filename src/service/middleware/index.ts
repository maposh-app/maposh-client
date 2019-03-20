import Amplify, { Auth } from "aws-amplify";
import { configureApiGateway, configureAuth } from "../../config";

const bootstrapAmplify = () => {
  Amplify.configure({
    Auth: {
      ...configureAuth()
    },
    API: {
      ...configureApiGateway()
    }
  });
  Auth.currentCredentials()
    .catch(e => console.log("error: ", e));
};

export default bootstrapAmplify;
