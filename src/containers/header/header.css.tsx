import { Link } from "react-router-dom";
import config from "../../config";
import styled from "../../service/theme/styled-components";

export const Menu = styled.div`
  background-color: ${config.theme.colorPrimary};
  width: 100% !important;
  flex: 0 1 auto;
  flex-wrap: wrap;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  z-index: 97;
`;

export const MenuList = styled.ul`
  margin: 0;
  align-items: center;
  display: flex;
  list-style-type: none;
  justify-content: space-between;
`;

export const MenuItem = styled.li`
  margin: 0;
  display: inline-block;
  flex-grow: 0;
  padding: 0.7em;
`;

export const MenuLink = styled(Link)`
  font-weight: bold;
`;

export const PlacesListMenuLink = styled(MenuLink)`
  @media (max-width: 768px) {
    width: 1em;
    .placesText {
      display: none;
      visibility: hidden;
    }
    display: block;
    width: 1em;
    height: 1em;
    background: linear-gradient(
      to bottom,
      black,
      black 20%,
      transparent 20%,
      transparent 40%,
      black 40%,
      black 60%,
      transparent 60%,
      transparent 80%,
      black 80%,
      black 100%
    );
  }
`;
