import { SignOut } from "aws-amplify-react";
import * as React from "react";
import { useTranslation } from "react-i18next";

export const UserMenuID: React.FC = () => {
  const { t } = useTranslation();
  // return <button onClick={() => Auth.signOut()}>{t("signout.title")}</button>;
  return <SignOut />;
};
