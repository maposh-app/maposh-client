import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import { FeatureCollection } from "geojson";
import * as _ from "lodash";
import { GeolocateControl } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as React from "react";
import ReactMapboxGl, {
  RotationControl,
  ScaleControl,
  ZoomControl
} from "react-mapbox-gl";
import { connect } from "react-redux";
import { MaposhState } from "../../service/store";
import { updatePan } from "../../service/store/map/actions";
import { IMapState } from "../../service/store/map/types";
import { ISystemState } from "../../service/store/system/types";
import { DrawStyles, MapBox } from "./map.css";

const MAPBOX_TOKEN: string = process.env.REACT_APP_MAPBOX_API_KEY || "";
const MAPBOX_STYLE: string = "mapbox://styles/mapbox/streets-v10"; // process.env.REACT_APP_MAPBOX_STYLE || "";

const INITIAL_MAP_DATA: FeatureCollection = {
  type: "FeatureCollection",
  features: []
};

const Map = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN,
  minZoom: 9,
  touchZoomRotate: true,
  doubleClickZoom: false
});

interface IMapProps {
  map: IMapState;
  system: ISystemState;
  updatePan: typeof updatePan;
}

interface IMapData {
  data: FeatureCollection;
  selectedFeatureIndices: number[];
  mode: string;
}

class BaseMap extends React.Component<IMapProps, IMapData> {
  private map: mapboxgl.Map | null;
  private draw: MapboxDraw;
  private mapLanguage: typeof MapboxLanguage;
  public constructor(props: IMapProps) {
    super(props);
    this.locate();
    this.map = null;
    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      },
      styles: DrawStyles
    });
    this.mapLanguage = new MapboxLanguage({
      defaultLanguage: this.props.system.language
    });
    this.setLanguage = this.setLanguage.bind(this);
    this.state = {
      data: INITIAL_MAP_DATA,
      selectedFeatureIndices: [],
      mode: "view"
    };
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  public componentDidMount() {
    window.addEventListener("keydown", this.handleKeydown);
  }

  public componentDidUpdate(prevProps: IMapProps) {
    if (this.map) {
      if (this.props.system.language !== prevProps.system.language) {
        const waiting = () => {
          if (!(this.map as mapboxgl.Map).isStyleLoaded()) {
            setTimeout(waiting, 200);
          } else {
            this.setLanguage();
          }
        };
        waiting();
      }
      if (this.props.map.location.city !== prevProps.map.location.city) {
        this.locate();
        this.map.flyTo({
          center: [
            this.props.map.viewport.longitude,
            this.props.map.viewport.latitude
          ],
          zoom: this.props.map.viewport.zoom
        });
      }
    }
  }
  public componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
  }
  public render() {
    const [
      minLongitude,
      minLatitude,
      maxLongitude,
      maxLatitude,
      cityCenterLongitude,
      cityCenterLatitude
    ] = this.props.map.location.boundingBox;

    return (
      <MapBox>
        <Map
          onStyleLoad={map => {
            this.map = map;
            this.setLanguage();
            this.locate();
            this.map.flyTo({
              center: [
                this.props.map.viewport.longitude,
                this.props.map.viewport.latitude
              ]
            });
            const geolocate = new GeolocateControl({
              positionOptions: {
                enableHighAccuracy: true
              },
              trackUserLocation: true
            });
            map.addControl(geolocate);
            map.addControl(this.draw, "top-left");
            map.addControl(this.mapLanguage);
          }}
          onMoveEnd={(map, evt) => this.updateLocation(map)}
          maxBounds={[[minLongitude, minLatitude], [maxLongitude, maxLatitude]]}
          style={MAPBOX_STYLE}
          containerStyle={{
            height: "100%",
            width: "100%"
          }}
        >
          <ScaleControl />
          <ZoomControl style={{ top: 45 }} />
          <RotationControl style={{ top: 105 }} />
        </Map>
      </MapBox>
    );
  }

  private updateLocation(map: mapboxgl.Map) {
    const [
      minLongitude,
      minLatitude,
      maxLongitude,
      maxLatitude,
      cityCenterLongitude,
      cityCenterLatitude
    ] = this.props.map.location.boundingBox;
    const { lng, lat } = map.getCenter();
    const zoom = map.getZoom();
    this.props.updatePan({
      viewport: {
        ...this.props.map.viewport,
        longitude: lng,
        latitude: lat,
        zoom
      }
    });
  }

  private handleKeydown({ key }: KeyboardEvent) {
    if (key === "Escape") {
      this.draw.deleteAll();
    }
  }

  private setLanguage() {
    if (this.map) {
      this.map.setStyle(
        this.mapLanguage.setLanguage(
          this.map.getStyle(),
          this.props.system.language
        )
      );
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
    }
  }
}

const mapStateToProps = (state: MaposhState) => ({
  system: state.system,
  map: state.map
});

const MaposhMap = connect(
  mapStateToProps,
  { updatePan }
)(BaseMap);

export default MaposhMap;
