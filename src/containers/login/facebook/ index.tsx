import * as React from "react";
import { useTranslation } from "react-i18next";
import { FacebookButton } from "./facebook.css";
import { Auth } from "aws-amplify";

interface AuthWindow extends Window {
  FB: any;
}

interface IFacebookResponse {
  status: string;
  email?: string;
  public_profile?: { name: string };
  accessToken?: string;
  expiresIn?: number;
}
export const FacebookLogin: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState(true);
  const [timer, setTimer] = React.useState(0);
  React.useEffect(() => {
    initFacebook();
  }, []);
  const checkFacebook = React.useCallback(() => {
    return new Promise((res, rej) => {
      const hasFbLoaded = () => {
        if ((window as AuthWindow).FB) {
          res();
          clearTimeout(timer);
        } else {
          setTimer(setTimeout(hasFbLoaded, 300));
        }
      };
      hasFbLoaded();
    });
  }, []);

  const initFacebook = React.useCallback(async () => {
    await checkFacebook();
    setIsLoading(false);
  }, []);

  const handleError = React.useCallback((error: any) => {
    alert(error);
  }, []);

  const handleResponse = React.useCallback(async (data: IFacebookResponse) => {
    const { email, public_profile, accessToken: token, expiresIn } = data;
    const expiresAt = expiresIn ? expiresIn * 1000 + new Date().getTime() : 0;
    const user = { email, name: public_profile ? public_profile.name : "" };

    setIsLoading(true);

    try {
      await Auth.federatedSignIn(
        "facebook",
        { token: token as string, expires_at: expiresAt },
        user
      );
    } catch (e) {
      handleError(e);
    }
    setIsLoading(false);
  }, []);

  const saveStatus = React.useCallback((response: IFacebookResponse) => {
    if (response.status === "connected") {
      handleResponse(response);
    } else {
      handleError(response);
    }
  }, []);

  const checkStatus = React.useCallback(
    () => (window as AuthWindow).FB.getLoginStatus(saveStatus),
    []
  );

  const handleClick = React.useCallback(() => {
    (window as AuthWindow).FB.login(checkStatus, {
      scope: "public_profile,email"
    });
  }, []);
  return (
    <FacebookButton disabled={isLoading} onClick={handleClick}>
      {t("login.facebook")}
    </FacebookButton>
  );
};
