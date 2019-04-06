import config from "../../config";
import styled from "../../service/theme/styled-components";

export const LandingBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const LandingBackground = styled.video`
  position: absolute;
  height: 100%;
  width: 100%;
  flex: 1;
  object-fit: cover;
`;

export const LandingPrompt = styled.span`
  position: relative;
  font-weight: bold;
  font-size: 16px;
  max-width: 200px;
  padding-bottom: 1em;
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

export const LandingFooter = styled.div`
  background-color: ${config.theme.colorPrimary};
  flex: 0 1 auto;
  align-self: flex-end;
  width: 100% !important;
  font-size: 0.8em;
  box-shadow: 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  z-index: 96;
`;

export const LandingHeader = styled.div`
  background-color: ${config.theme.colorPrimary};
  width: 100% !important;
  flex: 0 1 auto;
  flex-wrap: wrap;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export const MenuList = styled.ul`
  margin: 0;
  align-items: center;
  display: flex;
  list-style-type: none;
`;

export const MenuItem = styled.li`
  margin: 0;
  display: inline-block;
  padding-left: 0.7em;
  padding-right: 0.7em;
  padding-bottom: 0.3em;
  padding-top: 0.3em;
`;

export const LandingContent = styled.div`
  position: relative;
  flex-basis: auto;
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
  justify-content: center;
  padding: 1em;

  flex-grow: 0;
  flex-shrink: 0;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid ${config.theme.colorTender};
  border-radius: ${config.theme.elementBorderRadius};
  z-index: 0;
`;
