import Amplify from "aws-amplify";
import { configureApiGateway, configureAuth } from "../../config";

const bootstrapAmplify = () => {
  Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      ...configureAuth()
    },
    API: {
      ...configureApiGateway()
    }
  });
};

export default bootstrapAmplify;
