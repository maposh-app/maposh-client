import { MaposhStore } from "..";
import { default as AmplifyBridge } from "./amplify";

export default function bootstrapBridges(store: MaposhStore) {
  return {
    amplify: new AmplifyBridge(store)
  };
}
