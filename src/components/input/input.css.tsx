import config from "../../config";
import styled from "../../service/theme/styled-components";

export const InputBox = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
  flex: 1;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  border-bottom: 1px solid black;
  line-height: 1.42857143;
  background-color: transparent;
  padding: 0.4em;
  width: 100%;
`;

export const InputTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${config.theme.colorPrimary};
  border-top-left-radius: ${config.theme.elementBorderRadius};
  border-top-right-radius: ${config.theme.elementBorderRadius};
`;

export const InputPlaceholder = styled.span`
  padding: 1em;
`;

export const StyledErrorMessage = styled.div`
  color: ${config.theme.colorTender};
  font-size: 0.8em;
  padding: 1em;
`;
