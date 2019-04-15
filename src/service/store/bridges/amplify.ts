import { Auth, Hub } from "aws-amplify";
import MaposhStore from "..";
import { updateAuthStatus } from "../system/actions";
import config from "../../../config";

interface AuthWindow extends Window {
  fbAsyncInit: () => any;
  FB: any;
}

export default class AmplifyBridge {
  private loadFacebookSDK() {
    (window as AuthWindow).fbAsyncInit = () => {
      (window as AuthWindow).FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: "v3.1"
      });
    };

    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      (js as HTMLScriptElement).src = config.auth.facebook.sdk_url;
      if (fjs.parentNode) {
        fjs.parentNode.insertBefore(js, fjs);
      }
    })(document, "script", "facebook-jssdk");
  }

  constructor() {
    this.onHubCapsule = this.onHubCapsule.bind(this);
    Hub.listen("auth", this.onHubCapsule);
    this.loadFacebookSDK();
    this.checkUser();
  }

  public onHubCapsule() {
    this.loadFacebookSDK();
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
