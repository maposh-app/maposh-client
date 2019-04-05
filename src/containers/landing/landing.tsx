import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import MaposhLanguageSelector from "../language-selector";
import backgroundVideo from "./background.mp4";
import {
  LandingBackground,
  LandingBox,
  LandingContent,
  LandingFooter,
  LandingLogo,
  LandingMenuItem,
  LandingMenuList,
  LandingPrompt
} from "./landing.css";

const Landing: React.FC = () => {
  const { t, i18n } = useTranslation();
  return (
    <LandingBox>
      <LandingBackground autoPlay={true} loop={true} muted={true}>
        <source src={backgroundVideo} type="video/mp4" />
      </LandingBackground>
      <LandingContent>
        <LandingLogo />
        <LandingPrompt>
          <Trans i18nKey="about" i18n={i18n}>
            Maposh helps professionals, from novices to experts, connect and
            share ideas in community-picked
            <a href="https://en.wikipedia.org/wiki/Third_place">third places</a>
            .
          </Trans>
        </LandingPrompt>
      </LandingContent>
      <LandingFooter>
        <LandingMenuList>
          <LandingMenuItem>
            <MaposhLanguageSelector />
          </LandingMenuItem>
        </LandingMenuList>
      </LandingFooter>
    </LandingBox>
  );
};

export default Landing;
