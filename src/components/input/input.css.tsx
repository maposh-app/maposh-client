import config from "../../config";
import styled from "../../service/theme/styled-components";

export const InputBox = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  min-height: 5em;
  flex: 1;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  border-bottom: 1px solid black;
`;

export const StyledErrorMessage = styled.div`
  margin-top: 0.4em;
  color: ${config.theme.colorTender};
  font-size: 0.8em;
`;
