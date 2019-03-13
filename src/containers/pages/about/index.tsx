import * as React from "react";
import { Trans } from "react-i18next";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { MaposhState } from "../../../service/store";
import { AboutContent } from "./about.css";

const About: React.SFC<RouteComponentProps<{}>> = () => {
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

const mapStateToProps = (state: MaposhState) => ({
  system: state.system
});

export default connect(mapStateToProps)(About);
