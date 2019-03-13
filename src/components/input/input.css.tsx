import config from "../../config";
import styled from "../../service/theme/styled-components";

export const InputField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  flex: 1;
  .__input {
    border: none;
    border-bottom: 1px solid black;
  }
`;

export const StyledErrorMessage = styled.div`
  margin: 0;
  flex: 1;
`;
