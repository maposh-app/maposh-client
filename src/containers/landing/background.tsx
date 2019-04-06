import * as React from "react";
import backgroundVideo from "./background.mp4";
import { LandingBackground } from "./landing.css";

const Background: React.FC = () => {
  return (
    <LandingBackground
      playsInline={true}
      autoPlay={true}
      loop={true}
      muted={true}
    >
      <source src={backgroundVideo} type="video/mp4" />
    </LandingBackground>
  );
};

export default Background;
