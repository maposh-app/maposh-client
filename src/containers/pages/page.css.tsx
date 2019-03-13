import config from "../../config";
import styled from "../../service/theme/styled-components";

export const PageContent = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 1em;
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
