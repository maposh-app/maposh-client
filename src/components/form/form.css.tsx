import config from "../../config";
import styled from "../../service/theme/styled-components";

export const FormSubmitButton = styled.button`
  border: 1px solid ${config.theme.colorTender};
  border-radius: ${config.theme.elementBorderRadius};
  background-color: ${config.theme.colorPrimary};
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
  padding-top: 1em;
  font-size: 0.8em;
  text-align: center;
  a {
    text-decoration: underline;
    :link {
      color: ${config.theme.colorLink};
    }
    :visited {
      color: ${config.theme.colorVisitedLink};
    }
  }
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
