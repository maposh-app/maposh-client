import * as React from "react";
import { Box } from "./container.css";

const Container: React.FunctionComponent = props => {
  return <Box>{props.children}</Box>;
};

export default Container;
