import * as React from "react";
import { LogoContainer } from "./logo.css";
import LogoImage from "./logo.png";

const Logo: React.FC = props => <LogoContainer {...props} src={LogoImage} />;
export default Logo;
