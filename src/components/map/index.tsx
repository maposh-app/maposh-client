import "mapbox-gl/dist/mapbox-gl.css";
import * as React from "react";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import { connect } from "react-redux";
import { MaposhState } from "src/store";
import { updateMap } from "src/store/map/actions";
import { IMapState } from "src/store/map/types";
import { ISystemState } from "src/store/system/types";
import { IViewport } from "../../model/viewport";
import { MapBox, NavigationBox } from "./map.css";

const MAPBOX_TOKEN: string = process.env.REACT_APP_MAPBOX_API_KEY || "";
const MAPBOX_STYLE: string = process.env.REACT_APP_MAPBOX_STYLE || "";

interface IMapProps {
  map: IMapState;
  system: ISystemState;
  updateMap: typeof updateMap;
}

type IMapViewport = IViewport & {
  width: number;
  height: number;
};

class Map extends React.Component<IMapProps> {
  private map: React.RefObject<ReactMapGL>;
  public constructor(props: IMapProps) {
    super(props);
    this.map = React.createRef();
    this.setLanguage = this.setLanguage.bind(this);
  }

  public updateViewport = (viewport: IMapViewport) => {
    const { width, height, ...etc } = viewport;
    this.props.updateMap({
      viewport: etc
    });
  };

  public componentDidMount() {
    this.locate();
  }

  public componentDidUpdate() {
    if (this.map && this.map.current) {
      const map = this.map.current.getMap();
      const waiting = () => {
        if (!map.isStyleLoaded()) {
          setTimeout(waiting, 200);
        } else {
          this.setLanguage();
        }
      };
      waiting();
    }
  }

  public render() {
    return (
      <MapBox>
        <ReactMapGL
          ref={this.map}
          width="100%"
          height="100%"
          {...this.props.map.viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle={MAPBOX_STYLE}
          onViewportChange={(v: IMapViewport) => this.updateViewport(v)}
        >
          <NavigationBox>
            <NavigationControl onViewportChange={this.updateViewport} />
          </NavigationBox>
        </ReactMapGL>
      </MapBox>
    );
  }

  private setLanguage() {
    if (this.map && this.map.current) {
      const map = this.map.current.getMap();
      const style = map.getStyle();
      const layers = style.layers || [];
      const layerIDs = layers.reduce(
        (filtered: [string?], layer: mapboxgl.Layer) => {
          const id: string = layer.id.toLowerCase();
          if (
            id.includes("label") ||
            id.includes("poi") ||
            id.includes("place") ||
            id.includes("cafes") ||
            id.includes("libraries")
          ) {
            filtered.push(layer.id);
          }
          return filtered;
        },
        []
      );

      for (const id of layerIDs) {
        map.setLayoutProperty(id as string, "text-field", [
          "get",
          `name_${this.props.system.language.id}`
        ]);
      }
    }
  }
  private locate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.props.updateMap({
          viewport: {
            ...this.props.map.viewport,
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          }
        });
      });
    }
  }
}

const mapStateToProps = (state: MaposhState) => ({
  system: state.system,
  map: state.map
});

export default connect(
  mapStateToProps,
  { updateMap }
)(Map);
