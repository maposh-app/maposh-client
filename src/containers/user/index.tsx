import { SignOut } from "aws-amplify-react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import Logout from "../logout";

export const UserMenuID: React.FC = () => {
  const { t } = useTranslation();
  return <Logout />;
};
