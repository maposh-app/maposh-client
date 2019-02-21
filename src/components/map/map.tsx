import "mapbox-gl/dist/mapbox-gl.css";
import * as React from "react";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import { MapBox } from "./map.css";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY || "";

const initialState = {
  viewport: {
    latitude: 55.7558,
    longitude: 37.6173,
    zoom: 14
  }
};

type State = typeof initialState;
interface IViewport {
  height: number;
  latitude: number;
  longitude: number;
  width: number;
  zoom: number;
}

export default class Map extends React.Component<{}, State> {
  public state: State = initialState;

  public updateViewport = (viewport: IViewport) => {
    const { width, height, ...etc } = viewport;
    this.setState({ viewport: etc });
  };

  public render() {
    const { viewport } = this.state;
    return (
      <MapBox>
        <ReactMapGL
          width="100%"
          height="100%"
          {...viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onViewportChange={(v: IViewport) => this.updateViewport(v)}
        >
          <div style={{ position: "absolute", right: 0 }}>
            <NavigationControl onViewportChange={this.updateViewport} />
          </div>
        </ReactMapGL>
      </MapBox>
    );
  }
}
