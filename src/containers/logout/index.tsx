import { ConsoleLogger } from "@aws-amplify/core";
import { Auth } from "aws-amplify";
import Constants from "aws-amplify-react/src/Auth/common/constants";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { updatePreferences } from "../../service/store/system/actions";
import { LogoutButton } from "./logout.css";

const logger = new ConsoleLogger("SignOut");

interface ILogoutProps {
  updatePreferences: typeof updatePreferences;
  googleSignOut?: () => void;
  facebookSignOut?: () => void;
  amazonSignOut?: () => void;
  auth0SignOut?: (opts: string) => void;
}

const BaseLogout: React.FC<ILogoutProps> = props => {
  const { t } = useTranslation();
  const signOut = () => {
    props.updatePreferences({
      favourites: new Set<string>(),
      dislikes: new Set<string>()
    });
    let payload: { [prop: string]: string } = {};
    try {
      const source = localStorage.getItem(Constants.AUTH_SOURCE_KEY);
      payload = source ? JSON.parse(source) : {};
      localStorage.removeItem(Constants.AUTH_SOURCE_KEY);
    } catch (e) {
      alert(
        `Failed to parse the info from ${
          Constants.AUTH_SOURCE_KEY
        } from localStorage with ${e}`
      );
    }
    const {
      googleSignOut,
      facebookSignOut,
      amazonSignOut,
      auth0SignOut
    } = props;
    switch (payload.provider) {
      case Constants.GOOGLE:
        if (googleSignOut) {
          googleSignOut();
        } else {
          logger.debug("No Google signout method provided");
        }
        break;
      case Constants.FACEBOOK:
        if (facebookSignOut) {
          facebookSignOut();
        } else {
          logger.debug("No Facebook signout method provided");
        }
        break;
      case Constants.AMAZON:
        if (amazonSignOut) {
          amazonSignOut();
        } else {
          logger.debug("No Amazon signout method provided");
        }
        break;
      case Constants.AUTH0:
        if (auth0SignOut) {
          auth0SignOut(payload.opts);
        } else {
          logger.debug("No Auth0 signout method provided");
        }
        break;
      default:
        break;
    }

    Auth.signOut().catch(err => {
      logger.error(err);
    });
  };
  return <LogoutButton onClick={signOut}>{t("signout.title")}</LogoutButton>;
};

const mapStateToProps = () => ({});

const Logout = connect(
  mapStateToProps,
  { updatePreferences }
)(BaseLogout);

export default Logout;
