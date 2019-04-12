import * as React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import Logo from "../../components/logo";
import { MaposhState } from "../../service/store";
import { ISystemState } from "../../service/store/system/types";
import CitySelector from "../city-selector";
import { UserMenuID } from "../user";
import {
  Menu,
  MenuItem,
  MenuLink,
  MenuList,
  PlacesListMenuLink
} from "./header.css";

const mapStateToProps = (state: MaposhState) => ({
  system: state.system
});

interface IHeaderProps {
  system: ISystemState;
}

const BaseHeader: React.FC<IHeaderProps> = props => {
  const { t } = useTranslation();
  return (
    <Menu>
      <MenuList>
        <MenuItem style={{ flexShrink: 0 }}>
          <MenuLink to="/">
            <Logo />
          </MenuLink>
        </MenuItem>
        <MenuItem style={{ marginRight: "auto" }}>
          <PlacesListMenuLink to="/places">
            <span className="placesText">{t("places_link")}</span>
          </PlacesListMenuLink>
        </MenuItem>
        <MenuItem style={{ flex: 0.2, minWidth: "160px" }}>
          <CitySelector />
        </MenuItem>
        <MenuItem>
          {props.system.isAuthenticated ? (
            <UserMenuID />
          ) : (
            <MenuLink to="/login">{t("login.title")}</MenuLink>
          )}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const Header = connect(mapStateToProps)(BaseHeader);

export default Header;
