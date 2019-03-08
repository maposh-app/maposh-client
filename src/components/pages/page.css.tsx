import config from "../../config";
import styled from "../../theme/styled-components";

export const PageContent = styled.div`
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

