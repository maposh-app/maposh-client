import * as React from "react";
import { Box } from "./container.css";

const initialState = {
  width: 0,
  height: 0
};

type Viewport = typeof initialState;

export default class Container extends React.Component<{}, Viewport> {
  public constructor(props: {}) {
    super(props);
    this.state = initialState;
    this.updateViewport = this.updateViewport.bind(this);
  }

  public updateViewport = (viewport: Viewport) => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  public render() {
    const { children } = this.props;
    return <Box>{children}</Box>;
  }
}
