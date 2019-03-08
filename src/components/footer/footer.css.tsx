import config from "../../config";
import styled from "../../theme/styled-components";

export const Menu = styled.div`
  background-color: ${config.theme.colorComplementaryPure};
  flex-basis: auto;
  flex-shrink: 0;
  margin-bottom: 3px;
  width: 100% !important;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  z-index: 42;
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
  flex-grow: 0;
  flex-shrink: 0;
  padding-left: 0.7em;
  padding-right: 0.7em;
  padding-bottom: 0.3em;
  padding-top: 0.3em;
`;
