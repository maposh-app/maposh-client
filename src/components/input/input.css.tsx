import config from "../../config";
import styled from "../../service/theme/styled-components";

export const InputBox = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
  position: relative;
  min-height: 5em;
  flex: 1;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  border-bottom: 1px solid black;
`;

export const InputTitle = styled.div`
  padding: 0.3em;
  background-color: ${config.theme.colorPrimary};
  border-top-left-radius: ${config.theme.elementBorderRadius};
  border-top-right-radius: ${config.theme.elementBorderRadius};
`;

export const StyledErrorMessage = styled.div`
  margin-top: 0.4em;
  color: ${config.theme.colorTender};
  font-size: 0.8em;
`;
