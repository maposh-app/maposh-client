import * as React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { MaposhState } from "../../service/store";
import { ISystemState } from "../../service/store/system/types";
import CitySelector from "../city-selector";
import { UserMenuID } from "../user";
import { Menu, MenuItem, MenuLink, MenuList } from "./header.css";

const mapStateToProps = (state: MaposhState) => ({
  system: state.system
});

interface IHeaderProps {
  system: ISystemState;
}

const Header: React.FC<IHeaderProps> = props => {
  const { isAuthenticated } = props.system;
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
          {isAuthenticated ? (
            <UserMenuID />
          ) : (
            <MenuLink to="/login">{t("login.title")}</MenuLink>
          )}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default connect(mapStateToProps)(Header);
