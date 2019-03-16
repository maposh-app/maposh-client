import config from "../../config";
import styled from "../../service/theme/styled-components";

export const FormSubmitButton = styled.button`
  border: 0;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  border-radius: ${config.theme.elementBorderRadius};
  background-color: ${config.theme.colorPrimary};
  :disabled {
    opacity: 0.6;
    color: ${config.theme.colorTender};
  }
  outline: none;
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
  margin-bottom: 1em;
`;

export const FormPrompt = styled.aside`
  font-size: 0.6em;
  color: ${config.theme.colorTender};
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
`;

export const FormPromptBox = styled.div`
  flex: 0 1 auto;
  padding: 1em;
  text-align: center;
`;

export const FormNav = styled.button`
  background: none !important;
  color: ${config.theme.colorLink};
  border: none;
  padding: 0 !important;
  font: inherit;
  border-bottom: 1px solid ${config.theme.colorLink};
  cursor: pointer;
`;
