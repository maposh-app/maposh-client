import * as React from "react";
import { useTranslation } from "react-i18next";
import Logo from "../../components/logo";
import MaposhLanguageSelector from "../language-selector";
import {
  LandingContent,
  LandingFooter,
  LandingHeader,
  LandingPrompt,
  MenuItem,
  MenuList
} from "./landing.css";
import Subscribe from "./subscription";

const backgroundPromise = import("./background");
const Background = React.lazy(() => backgroundPromise);

const Landing: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Background />
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
    </>
  );
};

export default Landing;
