import { Link } from "@reach/router";
import * as React from "react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../language-selector/language-selector";
import { Menu, MenuItem, MenuList } from "./header.css";

export const Header: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <Menu>
      <MenuList>
        <MenuItem>
          <Link to="/">
            <h1>{t("title")}</h1>
          </Link>
        </MenuItem>
        <MenuItem>
          <LanguageSelector />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
