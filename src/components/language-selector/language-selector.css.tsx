import config from "../../config";
import styled from "../../theme/styled-components";

export const SelectorBox = styled.div`
  display: flex;
  flex-flow: row-reverse;
  justify-content: flex-start;
  align-items: center;
`;

export const OptionsBox = styled(SelectorBox)`
  border-right: 1px solid ${config.theme.colorPrimary};
`;

export const LanguageBox = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-flow: row;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
`;

export const Flag = styled.div`
  margin-left: 0.5em;
  margin-right: 0.5em;
  border-width: 1.5px;
  border-color: ${config.theme.colorTender};
  border-style: solid;
  border-radius: 100%;
  background-size: cover;
  background-position: center;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
`;
