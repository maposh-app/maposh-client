import config from "../../config";
import styled from "../../service/theme/styled-components";

export const FormSubmitButton = styled.button`
  border: 0;
  padding: 0.8em;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  border-radius: ${config.theme.elementBorderRadius};
  background-color: ${config.theme.colorPrimary};
  :disabled {
    opacity: 0.6;
    color: ${config.theme.colorTender};
  }
  outline: none;
  margin-top: 1em;
  margin-bottom: 1em;
`;

export const FormContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const FormContent = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0;
`;

export const FormPrompt = styled.aside`
  margin-top: auto;
  font-size: 1em;
  color: ${config.theme.colorTender};
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const FormPromptBox = styled.div`
  flex: 0 1 auto;
  text-align: center;
`;

export const FormNav = styled.button`
  background: none !important;
  color: ${config.theme.colorTender};
  border: none;
  padding: 5px !important;
  margin: 10px !important;
  font: inherit;
  cursor: pointer;
`;
