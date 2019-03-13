import * as React from "react";
import { useTranslation } from "react-i18next";
import CitySelector from "../city-selector";
import { Menu, MenuItem, MenuLink, MenuList } from "./header.css";

export const Header: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <Menu>
      <MenuList>
        <MenuItem style={{ marginRight: "auto" }}>
          <MenuLink to="/">{t("title")}</MenuLink>
        </MenuItem>
        <MenuItem style={{ flex: 0.2, minWidth: "160px" }}>
          <CitySelector />
        </MenuItem>
        <MenuItem>
          <MenuLink to="/signup">{t("signup.title")}</MenuLink>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
