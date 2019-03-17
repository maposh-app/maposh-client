import { Auth, Hub } from "aws-amplify";
import { MaposhStore } from "..";
import { updateUserStatus } from "../system/actions";

export default class AmplifyBridge {
  private store: MaposhStore;
  constructor(store: MaposhStore) {
    this.store = store;

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
        this.store.dispatch(
          updateUserStatus({ isAuthenticated: user !== null })
        );
      })
      .catch(() => {
        this.store.dispatch(updateUserStatus({ isAuthenticated: false }));
      });
  }
}
