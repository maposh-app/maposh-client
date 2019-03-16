import { Link } from "react-router-dom";
import config from "../../config";
import styled from "../../service/theme/styled-components";

export const Menu = styled.div`
  background-color: ${config.theme.colorPrimary};
  width: 100% !important;
  flex: 0 1 auto;
  flex-wrap: wrap;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
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
