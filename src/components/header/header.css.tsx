import styled from "../../theme/styled-components";

export const Menu = styled.div`
  flex-basis: auto;
  flex-shrink: 0;
  margin-bottom: 3px;
  width: 100% !important;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
`;

export const MenuList = styled.ul`
  margin: 0;
  align-items: center !important;
  display: flex !important;
  list-style-type: none;
  justify-content: space-between !important;
`;

export const MenuItem = styled.li`
  margin: 0;
  padding: 0.7em;
`;
