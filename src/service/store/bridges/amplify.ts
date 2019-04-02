import { Auth, Hub } from "aws-amplify";
import MaposhStore from "..";
import { updateAuthStatus } from "../system/actions";

export default class AmplifyBridge {
  constructor() {
    this.onHubCapsule = this.onHubCapsule.bind(this);
    Hub.listen("auth", this, "AmplifyBridge");
    this.checkUser();
  }

  public onHubCapsule() {
    this.checkUser();
  }

  public checkUser() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        MaposhStore.dispatch(
          updateAuthStatus({ isAuthenticated: user !== null })
        );
      })
      .catch(() => {
        MaposhStore.dispatch(updateAuthStatus({ isAuthenticated: false }));
      });
  }
}
