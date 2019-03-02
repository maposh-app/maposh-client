import "mapbox-gl/dist/mapbox-gl.css";
import * as React from "react";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import { connect } from "react-redux";
import { MaposhState } from "src/store";
import { ISystemState } from "src/store/system/types";
import config from "../../config";
import { MapBox, NavigationBox } from "./map.css";

const MAPBOX_TOKEN: string = process.env.REACT_APP_MAPBOX_API_KEY || "";
const MAPBOX_STYLE: string = process.env.REACT_APP_MAPBOX_STYLE || "";

const mapConfig = config.map;

const initialState = {
  viewport: {
    latitude: mapConfig.latitude,
    longitude: mapConfig.longitude,
    zoom: mapConfig.zoom
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

interface IMapProps {
  system: ISystemState;
}

class Map extends React.Component<IMapProps, State> {
  public state: State = initialState;
  private map: React.RefObject<ReactMapGL>;
  public constructor(props: IMapProps) {
    super(props);
    this.map = React.createRef();
  }

  public updateViewport = (viewport: IViewport) => {
    const { width, height, ...etc } = viewport;
    this.setState({ viewport: etc });
  };

  public render() {
    const { viewport } = this.state;
    return (
      <MapBox>
        <ReactMapGL
          ref={this.map}
          width="100%"
          height="100%"
          {...viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle={MAPBOX_STYLE}
          onViewportChange={(v: IViewport) => this.updateViewport(v)}
        >
          <NavigationBox>
            <NavigationControl onViewportChange={this.updateViewport} />
          </NavigationBox>
        </ReactMapGL>
      </MapBox>
    );
  }
}

const mapStateToProps = (state: MaposhState) => ({
  system: state.system
});

export default connect(mapStateToProps)(Map);
