import config from "../../config";
import styled from "../../service/theme/styled-components";

export const LogoutButton = styled.button`
  background: none !important;
  color: ${config.theme.colorLink};
  border: none;
  padding: 0 !important;
  font: inherit;
  cursor: pointer;
  font-weight: bold;
`;
