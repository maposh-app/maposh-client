import { default as AmplifyBridge } from "./amplify";

export default function bootstrapBridges() {
  return {
    amplify: new AmplifyBridge()
  };
}
