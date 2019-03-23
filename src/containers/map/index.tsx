import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import * as _ from "lodash";
import { GeolocateControl, LngLat } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as React from "react";
import { withTranslation } from "react-i18next";
import ReactMapboxGl, {
  Cluster,
  Feature,
  Layer,
  Marker,
  Popup,
  RotationControl,
  ScaleControl,
  ZoomControl
} from "react-mapbox-gl";
import { connect } from "react-redux";
import { IPlace } from "../../model/place";
import i18n from "../../service/i18n";
import { MaposhState } from "../../service/store";
import { updatePan } from "../../service/store/map/actions";
import { IMapState } from "../../service/store/map/types";
import { ISystemState } from "../../service/store/system/types";
import { RecommendationsLoader } from "../../utils/load";
import {
  clusterMarkerStyle,
  drawStyle,
  MapBox,
  PlaceMarker,
  PlacePopup,
  placesLayerStyle,
  SearchBox,
  ShowPlacesButton
} from "./map.css";

const MAPBOX_TOKEN: string = process.env.REACT_APP_MAPBOX_API_KEY || "";
const MAPBOX_STYLE: string = "mapbox://styles/mapbox/streets-v10"; // process.env.REACT_APP_MAPBOX_STYLE || "";

const Map = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN,
  minZoom: 9,
  doubleClickZoom: false
});

interface IMapProps {
  t: i18n.TFunction;
  i18n: i18n.i18n;
  tReady: any;
  map: IMapState;
  system: ISystemState;
  updatePan: typeof updatePan;
}

interface IPopup {
  coordinates: GeoJSON.Position;
  place: IPlace;
}

interface IMapData {
  places: IPlace[];
  popup?: IPopup;
  isDrawing: boolean;
}

class BaseMap extends React.Component<IMapProps, IMapData> {
  private map: mapboxgl.Map | null;
  private draw: MapboxDraw;
  private geolocate: GeolocateControl;
  private search: typeof MapboxGeocoder;
  private mapLanguage: typeof MapboxLanguage;
  private recommender: RecommendationsLoader;
  public constructor(props: IMapProps) {
    super(props);
    this.locate();
    this.map = null;
    this.recommender = new RecommendationsLoader();
    this.geolocate = new GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },

      trackUserLocation: true
    });
    // TODO: Make a pull request for native support
    (this.geolocate as any)._updateCamera = (position: Position) => {
      if (
        this.withinBoundingBox(
          position.coords.longitude,
          position.coords.latitude
        )
      ) {
        const center = new LngLat(
          position.coords.longitude,
          position.coords.latitude
        );
        const radius = position.coords.accuracy;

        (this.geolocate as any)._map.fitBounds(
          center.toBounds(radius),
          (this.geolocate as any).options.fitBoundsOptions,
          {
            geolocateSource: true
          }
        );
      }
    };
    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      },
      styles: drawStyle
    });
    this.mapLanguage = new MapboxLanguage({
      defaultLanguage: this.props.system.language
    });
    this.setLanguage = this.setLanguage.bind(this);
    this.state = {
      places: [],
      isDrawing: false
    };
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handlePlaces = this.handlePlaces.bind(this);
    this.startDrawing = this.startDrawing.bind(this);
    this.stopDrawing = this.stopDrawing.bind(this);
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
            this.setupSearch();
          }
        };
        waiting();
      }
      if (this.props.map.location.city !== prevProps.map.location.city) {
        this.locate();
        this.setupSearch();
        this.stopDrawing();
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
      maxLatitude
    ] = this.props.map.location.boundingBox;
    const { places, isDrawing, popup } = this.state;

    return (
      <MapBox>
        <Map
          onStyleLoad={map => {
            this.map = map;
            this.setLanguage();
            this.setupSearch();
            this.locate();
            this.map.flyTo({
              center: [
                this.props.map.viewport.longitude,
                this.props.map.viewport.latitude
              ]
            });
            map.addControl(this.geolocate);
            map.addControl(this.draw, "top-left");
            map.on("draw.create", this.startDrawing);
            map.on("draw.delete", this.stopDrawing);
            map.addControl(this.mapLanguage);
          }}
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
          <SearchBox id="search" />
          {/* <Cluster ClusterMarkerFactory={this.clusterMarker}>
            {places.map((place: IPlace, key: number) => (
              <Marker
                key={key}
                coordinates={[place.longitude, place.latitude]}
                data-feature={place}
              >
                <PlaceMarker image={place.photo || ""} />
              </Marker>
            ))}
          </Cluster>
            */}
          {popup && (
            <Popup offset={[0, -15]} coordinates={popup.coordinates}>
              <PlacePopup>{popup.place.name}</PlacePopup>
            </Popup>
          )}
          <Layer type="circle" id="places" paint={placesLayerStyle}>
            {places.length > 0 &&
              places.map((place, index) => {
                return (
                  <Feature
                    key={`${place.name}-${index}`}
                    coordinates={[place.longitude, place.latitude]}
                    properties={place}
                    onClick={() => {
                      this.setState({
                        popup: {
                          coordinates: [place.longitude, place.latitude],
                          place
                        }
                      });
                    }}
                    onMouseEnter={evt => {
                      this.setState({
                        popup: {
                          coordinates: [place.longitude, place.latitude],
                          place
                        }
                      });
                    }}
                    onMouseLeave={() => {
                      this.setState({ popup: undefined });
                    }}
                  />
                );
              })}
          </Layer>
          <ShowPlacesButton
            style={{
              display: isDrawing || places.length > 0 ? "inline-block" : "none"
            }}
            onClick={() => this.handlePlaces("coffee")}
          >
            {isDrawing
              ? this.props.t("search.show.cafes")
              : places.length > 0
              ? this.props.t("search.hide.cafes")
              : ""}
          </ShowPlacesButton>
        </Map>
      </MapBox>
    );
  }

  private stopDrawing() {
    this.setState({ isDrawing: false, places: [] });
  }

  private startDrawing() {
    this.setState({ isDrawing: true });
  }

  private handlePlaces(intent: string) {
    const data = this.draw.getAll();
    if (data.features.length > 0) {
      this.recommender
        .recommend(data, this.props.map.location.city, intent)
        .then(places => {
          this.setState({ places });
        })
        .catch(err => {
          alert(this.props.t("search.errors.404"));
          console.log(err);
        });
      this.draw.deleteAll();
      this.setState({ isDrawing: false });
    } else if (this.state.places.length > 0) {
      this.setState({ places: [] });
    }
  }

  private handleKeydown({ key }: KeyboardEvent) {
    if (key === "Escape") {
      this.draw.deleteAll();
      this.setState({ places: [] });
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

  private setupSearch() {
    const [
      minLongitude,
      minLatitude,
      maxLongitude,
      maxLatitude
    ] = this.props.map.location.boundingBox;
    this.search = new MapboxGeocoder({
      accessToken: MAPBOX_TOKEN,
      language: this.props.system.language,
      limit: 10,
      bbox: [minLongitude, minLatitude, maxLongitude, maxLatitude],
      trackProximity: true
    });
    const searchBox = document.getElementById("search");
    if (searchBox) {
      while (searchBox.firstChild) {
        searchBox.removeChild(searchBox.firstChild);
      }
      searchBox.appendChild(this.search.onAdd(this.map));
      const searchInput = searchBox.querySelector("input");
      if (searchInput) {
        searchInput.placeholder = this.props.t("search.placeholder");
      }
    }
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

const MaposhMap = withTranslation()(
  connect(
    mapStateToProps,
    { updatePan }
  )(BaseMap)
);

export default MaposhMap;
