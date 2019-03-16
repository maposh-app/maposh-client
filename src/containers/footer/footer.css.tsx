import { Link } from "react-router-dom";
import config from "../../config";
import styled from "../../service/theme/styled-components";

export const Menu = styled.div`
  background-color: ${config.theme.colorPrimary};
  flex: 0 1 auto;
  width: 100% !important;
  font-size: 0.8em;
  box-shadow: 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

export const MenuList = styled.ul`
  margin: 0;
  align-items: center;
  display: flex;
  list-style-type: none;
`;

export const MenuItem = styled.li`
  margin: 0;
  display: inline-block;
  padding-left: 0.7em;
  padding-right: 0.7em;
  padding-bottom: 0.3em;
  padding-top: 0.3em;
`;

export const MenuLink = styled(Link)`
  font-weight: bold;
`;
