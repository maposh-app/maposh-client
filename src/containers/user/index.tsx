import { Auth } from "aws-amplify";
import * as React from "react";
import { useTranslation } from "react-i18next";

export const UserMenuID: React.FC = () => {
  const { t } = useTranslation();
  return <button onClick={() => Auth.signOut()}>{t("signout.title")}</button>;
};
