import * as React from "react";
import { Box } from "./container.css";

export default class Container extends React.Component<{}, {}> {
  public render() {
    const { children } = this.props;
    return <Box>{children}</Box>;
  }
}
