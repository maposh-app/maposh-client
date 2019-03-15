import * as React from "react";
import { getWindowHeight, getWindowWidth } from "../../utils/extract";
import { Box } from "./container.css";

const Container: React.FunctionComponent = props => {
  const [height, setHeight] = React.useState(`${getWindowHeight()}px`);
  const [width, setWidth] = React.useState(`${getWindowWidth()}px`);
  const updateWindow = () => {
    setWidth(`${getWindowWidth()}px`);
    setHeight(`${getWindowHeight()}px`);
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateWindow);
    return () => window.removeEventListener("resize", updateWindow);
  });
  return <Box style={{ height, width }}>{props.children}</Box>;
};

export default Container;
