import { Link } from "@reach/router";
import * as React from "react";
import { useTranslation } from "react-i18next";
import CitySelector from "../city-selector";
import LanguageSelector from "../language-selector";
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
        <MenuItem style={{ flex: 1 }}>
          <CitySelector />
        </MenuItem>
        <MenuItem style={{ paddingRight: "5px" }}>
          <LanguageSelector />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
