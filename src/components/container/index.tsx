import * as React from "react";
import { getWindowHeight, getWindowWidth } from "../../utils/extract";
import { Box } from "./container.css";

const Container: React.FunctionComponent = props => {
  const [height, setHeight] = React.useState(getWindowHeight());
  const [width, setWidth] = React.useState(getWindowWidth());
  const updateWindow = () => {
    setWidth(getWindowWidth());
    setHeight(getWindowHeight());
  };
  React.useEffect(() => {
    updateWindow();
    window.addEventListener("resize", updateWindow);
    return () => window.removeEventListener("resize", updateWindow);
  });
  return (
    <Box style={{ height: `${height}px`, width: `${width}px` }}>
      {props.children}
    </Box>
  );
};

export default Container;
