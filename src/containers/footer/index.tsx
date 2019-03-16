import * as React from "react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../language-selector";
import { Menu, MenuItem, MenuLink, MenuList } from "./footer.css";
const Footer: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <Menu>
      <MenuList>
        <MenuItem style={{ marginRight: "auto", flexShrink: 0 }}>
          <LanguageSelector />
        </MenuItem>
        <MenuItem>
          <MenuLink to="/about">{t("about_link")}</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/">{t("map_link")}</MenuLink>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default Footer;
