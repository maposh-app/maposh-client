import * as React from "react";
import { Trans } from "react-i18next";
import { withRouter } from "react-router-dom";
import { NamedModal } from "../../../components/modal";
import { AboutContent } from "./about.css";

export const BaseAbout: React.FC = props => {
  return (
    <AboutContent>
      <Trans i18nKey="about">
        Maposh helps professionals, from novices to experts, connect and share
        ideas in community-picked
        <a href="https://en.wikipedia.org/wiki/Third_place">third places</a>.
      </Trans>
    </AboutContent>
  );
};
const About = withRouter(NamedModal("about", <BaseAbout />));

export default About;
