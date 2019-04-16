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
  const [isLoading, setIsLoading] = React.useState(false);
  const handleClick = React.useCallback(() => {
    setIsLoading(true);
    Auth.federatedSignIn({
      provider: "Facebook"
    } as any);
  }, []);
  return (
    <FacebookButton disabled={isLoading} onClick={handleClick}>
      {t("login.facebook")}
    </FacebookButton>
  );
};
