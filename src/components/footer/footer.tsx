import { Link } from "@reach/router";
import * as React from "react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../language-selector";
import { Menu, MenuItem, MenuList } from "./footer.css";
export const Footer: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <Menu>
      <MenuList>
        <MenuItem style={{ marginRight: "auto" }}>
          <LanguageSelector />
        </MenuItem>
        <MenuItem>
          <Link to="/about">
            <h1>{t("about_link")}</h1>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/">
            <h1>{t("map_link")}</h1>
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
