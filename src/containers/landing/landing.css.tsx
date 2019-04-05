import Logo from "../../components/logo";
import config from "../../config";
import styled from "../../service/theme/styled-components";

export const LandingBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const LandingBackground = styled.video`
  flex: 1;
  position: relative;
  height: 1em;
  object-fit: cover;
  z-index: -1;
`;

export const LandingLogo = styled(Logo)`
  width: 4em;
  height: 4em;
  flex-shrink: 0 !important;
  margin: 1em;
`;

export const LandingPrompt = styled.span`
  margin: 1em;
`;

export const LandingFooter = styled.div`
  background-color: ${config.theme.colorPrimary};
  flex: 0 1 auto;
  align-self: flex-start;
  width: 100% !important;
  font-size: 0.8em;
  box-shadow: 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  z-index: 96;
  margin-top: auto;
`;

export const LandingMenuList = styled.ul`
  margin: 0;
  align-items: center;
  display: flex;
  list-style-type: none;
`;

export const LandingMenuItem = styled.li`
  margin: 0;
  display: inline-block;
  padding-left: 0.7em;
  padding-right: 0.7em;
  padding-bottom: 0.3em;
  padding-top: 0.3em;
`;

export const LandingContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  left: 50%;
  top: 50%;
  padding: 2em;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.97);
  border: 1px solid ${config.theme.colorTender};
  border-radius: ${config.theme.elementBorderRadius};
  z-index: 0;
`;
