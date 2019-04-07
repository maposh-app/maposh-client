import * as React from "react";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import { NamedModal } from "../../../components/modal";
import { AboutContent } from "./about.css";

export const BaseAbout: React.FC = props => {
  const { t } = useTranslation();
  return <AboutContent>{t("about")}</AboutContent>;
};
const About = withRouter(NamedModal("about", <BaseAbout />));

export default About;
