import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import Logo from "../../components/logo";
import MaposhLanguageSelector from "../language-selector";
import backgroundVideo from "./background.mp4";
import {
  LandingBackground,
  LandingBox,
  LandingContent,
  LandingFooter,
  LandingHeader,
  LandingPrompt,
  MenuItem,
  MenuList
} from "./landing.css";
import Subscribe from "./subscription";

const Landing: React.FC = () => {
  const { t } = useTranslation();
  return (
    <LandingBox>
      <LandingBackground
        playsInline={true}
        autoPlay={true}
        loop={true}
        muted={true}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </LandingBackground>
      <LandingHeader>
        <MenuList>
          <MenuItem>
            <Logo />
          </MenuItem>
        </MenuList>
      </LandingHeader>
      <LandingContent>
        <LandingPrompt>{t("about")}</LandingPrompt>
        <Subscribe />
      </LandingContent>
      <LandingFooter>
        <MenuList>
          <MenuItem>
            <MaposhLanguageSelector />
          </MenuItem>
        </MenuList>
      </LandingFooter>
    </LandingBox>
  );
};

export default Landing;
