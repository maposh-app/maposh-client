import * as _ from "lodash";
import "mapbox-gl/dist/mapbox-gl.css";
import * as React from "react";
import ReactMapGL, { NavigationControl, ViewState } from "react-map-gl";
import { connect } from "react-redux";
import { IViewport } from "../../model/viewport";
import { MaposhState } from "../../store";
import { updatePan } from "../../store/map/actions";
import { IMapState } from "../../store/map/types";
import { ISystemState } from "../../store/system/types";
import { MapBox, NavigationBox } from "./map.css";

const MAPBOX_TOKEN: string = process.env.REACT_APP_MAPBOX_API_KEY || "";
const MAPBOX_STYLE: string = process.env.REACT_APP_MAPBOX_STYLE || "";

interface IMapProps {
  map: IMapState;
  system: ISystemState;
  updatePan: typeof updatePan;
  path: string;
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

  public updateViewport = (viewport: ViewState) => {
    const { width, height, ...etc } = viewport as IMapViewport;
    const [
      minLongitude,
      minLatitude,
      maxLongitude,
      maxLatitude
    ] = this.props.map.location.boundingBox;
    if (etc.longitude <= minLongitude) {
      etc.longitude = minLongitude;
    }
    if (etc.longitude >= maxLongitude) {
      etc.longitude = maxLongitude;
    }
    if (etc.latitude <= minLatitude) {
      etc.latitude = minLatitude;
    }
    if (etc.latitude >= maxLatitude) {
      etc.latitude = maxLatitude;
    }
    this.props.updatePan({
      viewport: etc
    });
  };

  public componentDidMount() {
    this.locate();
    if (this.map && this.map.current) {
      const map = this.map.current.getMap();
      const waiting = () => {
        if (!(map && map.isStyleLoaded())) {
          setTimeout(waiting, 200);
        } else {
          this.setLanguage();
        }
      };
      waiting();
    }
  }

  public componentDidUpdate(prevProps: IMapProps) {
    if (this.map && this.map.current) {
      if (this.props.system.language !== prevProps.system.language) {
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
  }

  public render() {
    return (
      <MapBox>
        <ReactMapGL
          ref={this.map}
          width="100%"
          height="100%"
          minZoom={9}
          {...this.props.map.viewport}
          touchRotate={true}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle={MAPBOX_STYLE}
          onViewportChange={(v: ViewState) => this.updateViewport(v)}
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
          `name_${this.props.system.language}`
        ]);
      }
    }
  }

  private withinBoundingBox(longitude: number, latitude: number) {
    const [
      minLongitude,
      minLatitude,
      maxLongitude,
      maxLatitude
    ] = this.props.map.location.boundingBox;
    return (
      _.inRange(longitude, minLongitude, maxLongitude) &&
      _.inRange(latitude, minLatitude, maxLatitude)
    );
  }
  private locate() {
    if (
      !this.withinBoundingBox(
        this.props.map.viewport.longitude,
        this.props.map.viewport.latitude
      )
    ) {
      const [
        ,
        ,
        ,
        ,
        cityCenterLongitude,
        cityCenterLatitude
      ] = this.props.map.location.boundingBox;
      this.props.updatePan({
        viewport: {
          ...this.props.map.viewport,
          longitude: cityCenterLongitude,
          latitude: cityCenterLatitude
        }
      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          if (
            this.withinBoundingBox(
              position.coords.longitude,
              position.coords.latitude
            )
          ) {
            this.props.updatePan({
              viewport: {
                ...this.props.map.viewport,
                longitude: position.coords.longitude,
                latitude: position.coords.latitude
              }
            });
          }
        });
      }
    }
  }
}

const mapStateToProps = (state: MaposhState) => ({
  system: state.system,
  map: state.map
});

export default connect(
  mapStateToProps,
  { updatePan }
)(Map);
