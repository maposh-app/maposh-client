import config from "../../config";
import styled from "../../service/theme/styled-components";

export const FormSubmitButton = styled.button`
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
