import * as React from "react";
import { Box } from "./container.css";

const Container: React.FunctionComponent = props => {
  const [height, setHeight] = React.useState(window.innerHeight);
  const [width, setWidth] = React.useState(document.body.clientWidth);
  const updateWindow = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  React.useEffect(() => {
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
