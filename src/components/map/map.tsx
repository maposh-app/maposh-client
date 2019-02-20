import "mapbox-gl/dist/mapbox-gl.css";
import * as React from "react";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import { MapBox } from "./map.css";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY || "";

const initialState = {
  viewport: {
    height: 400,
    width: 400,
    latitude: 55.7558,
    longitude: 37.6173,
    zoom: 14
  }
};

type State = typeof initialState;
type Viewport = typeof initialState.viewport;

export default class Map extends React.Component<{}, State> {
  public state: State = initialState;
  public mapWidgetElement: HTMLDivElement;

  public componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  public updateViewport = (viewport: Viewport) => {
    this.setState(prevState => ({
      viewport: { ...prevState.viewport, ...viewport }
    }));
  };

  public resize = () => {
    this.setState(prevState => ({
      viewport: {
        ...prevState.viewport,
        height: this.mapWidgetElement.clientHeight,
        width: this.mapWidgetElement.clientWidth
      }
    }));
  };

  public render() {
    const { viewport } = this.state;
    return (
      <MapBox
        ref={(mapWidgetElement: HTMLDivElement) =>
          (this.mapWidgetElement = mapWidgetElement)
        }
      >
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onViewportChange={(v: Viewport) => this.updateViewport(v)}
        >
          <div style={{ position: "absolute", right: 30, bottom: 30 }}>
            <NavigationControl onViewportChange={this.updateViewport} />
          </div>
        </ReactMapGL>
      </MapBox>
    );
  }
}
