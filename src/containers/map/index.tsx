import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import { Point } from "geojson";
import { GeolocateControl, LngLat } from "mapbox-gl";
import * as React from "react";
import { withTranslation } from "react-i18next";
import ReactMapboxGl, {
  Feature,
  Layer,
  RotationControl,
  ScaleControl,
  ZoomControl
} from "react-mapbox-gl";
import { connect } from "react-redux";
import Close from "../../components/close";
import { IPlace } from "../../model/place";
import i18n from "../../service/i18n";
import { MaposhState } from "../../service/store";
import { updateCity, updatePan } from "../../service/store/map/actions";
import { IMapState } from "../../service/store/map/types";
import { ISystemState } from "../../service/store/system/types";
import { getCityIfExists, withinBoundingBox } from "../../utils/extract";
import { RecommendationsLoader } from "../../utils/load";
import PlaceProfile from "../place";
import {
  drawStyle,
  MapBox,
  placesLayerStyle,
  SearchBox,
  ShowPlacesButton,
  StyledPopup,
  trackingStyle
} from "./map.css";

const MAPBOX_TOKEN: string = process.env.REACT_APP_MAPBOX_API_KEY || "";
const MAPBOX_STYLE: string = "mapbox://styles/mapbox/streets-v10"; // process.env.REACT_APP_MAPBOX_STYLE || "";

const Map = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN,
  minZoom: 9
});

interface IMapProps {
  t: i18n.TFunction;
  i18n: i18n.i18n;
  tReady: any;
  map: IMapState;
  system: ISystemState;
  updatePan: typeof updatePan;
  updateCity: (newCity: string) => void;
}

interface IPopup {
  coordinates: GeoJSON.Position;
  source?: mapboxgl.Point;
  place: IPlace;
}

interface IMapData {
  places: string[];
  popup?: IPopup;
  isDrawing: boolean;
  isTracking: boolean;
}

class BaseMap extends React.Component<IMapProps, IMapData> {
  private map?: mapboxgl.Map;
  private draw: MapboxDraw;
  private geolocate: GeolocateControl;
  private search: typeof MapboxGeocoder;
  private mapLanguage: typeof MapboxLanguage;
  private recommender: RecommendationsLoader;
  public constructor(props: IMapProps) {
    super(props);
    this.locate();
    this.recommender = new RecommendationsLoader(this.props.system.language);
    this.geolocate = new GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },

      trackUserLocation: true
    });
    // TODO: Make a pull request for native support
    (this.geolocate as any)._updateCamera = (position: Position) => {
      if (
        withinBoundingBox(
          position.coords.longitude,
          position.coords.latitude,
          this.props.map.location
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
      } else {
        const city = getCityIfExists(position);
        if (city) {
          this.props.updateCity(city);
        }
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
      isDrawing: false,
      isTracking: false
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
            this.recommender.language = this.props.system.language;
          }
        };
        waiting();
      }
      if (this.props.map.location !== prevProps.map.location) {
        this.setupSearch();
        this.stopDrawing();
        this.locate();
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
    const { places, isDrawing, isTracking, popup } = this.state;

    return (
      <MapBox>
        <Map
          onMoveStart={() => {
            this.setState({ isTracking: false });
          }}
          onMoveEnd={() => {
            this.setState({ isTracking: true });
          }}
          onStyleLoad={map => {
            this.map = map;
            this.setLanguage();
            this.locate();
            this.setupSearch();
            map.addControl(this.geolocate);
            map.addControl(this.draw, "top-left");
            map.on("draw.create", this.startDrawing);
            map.on("draw.delete", this.stopDrawing);
            map.addControl(this.mapLanguage);
            map.on("click", "places", evt => {
              if (evt.features) {
                const info = evt.features[0];
                const coordinates = (info.geometry as Point).coordinates.slice();
                while (Math.abs(evt.lngLat.lng - coordinates[0]) > 180) {
                  coordinates[0] +=
                    evt.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                if (info.properties) {
                  this.setState({
                    isTracking: true,
                    popup: {
                      coordinates: [
                        info.properties.longitude,
                        info.properties.latitude
                      ],
                      source: evt.point,
                      place: info.properties as IPlace
                    }
                  });
                }
              }
            });
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
          {popup && (
            <StyledPopup>
              <PlaceProfile place={popup.place} />
              <Close
                onClick={() => {
                  this.setState({ isTracking: false, popup: undefined });
                }}
              />
            </StyledPopup>
          )}
          <Layer type="circle" id="places" paint={placesLayerStyle}>
            {places.length > 0 &&
              places.map((place, index) => {
                return (
                  <Feature
                    key={`${place}-${index}`}
                    coordinates={[
                      this.props.map.places[place].longitude,
                      this.props.map.places[place].latitude
                    ]}
                    properties={this.props.map.places[place]}
                  />
                );
              })}
          </Layer>
          <Layer type="line" id="tracker" paint={trackingStyle}>
            {popup &&
              isTracking &&
              this.map &&
              (() => {
                const { lng, lat } = this.map.getCenter();
                return (
                  <Feature coordinates={[popup.coordinates, [lng, lat]]} />
                );
              })()}
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
    this.setState({
      isDrawing: false,
      places: [],
      isTracking: false,
      popup: undefined
    });
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
      this.stopDrawing();
    }
  }

  private handleKeydown({ key }: KeyboardEvent) {
    if (key === "Escape") {
      this.draw.deleteAll();
      this.setState({ places: [], isTracking: false, popup: undefined });
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
    if (this.map && this.map.getZoom() > 9) {
      const { lng, lat } = this.map.getCenter().wrap();
      this.props.updatePan({
        viewport: {
          ...this.props.map.viewport,
          longitude: lng,
          latitude: lat
        }
      });
      this.search.setProximity({ longitude: lng, latitude: lat });
    } else {
      this.search.setProximity(null);
    }
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
    this.search.on("result", (event: any) => {
      if (
        event.result &&
        event.result.place_name &&
        event.result.geometry &&
        event.result.place_type &&
        event.result.place_type.includes("poi")
      ) {
        this.stopDrawing();
        console.log(event);
        this.recommender
          .searchByAddress(
            event.result.text,
            event.result.place_name,
            event.result.geometry.coordinates[0],
            event.result.geometry.coordinates[1]
          )
          .then(places => {
            places.forEach(placeID => {
              if (
                this.props.map.places[placeID].name.includes(event.result.text)
              ) {
                this.setState({
                  isTracking: true,
                  popup: {
                    coordinates: event.result.geometry.coordinates,
                    place: this.props.map.places[placeID]
                  }
                });
              }
            });
            this.setState({ places });
          })
          .catch(err => {
            alert(this.props.t("search.errors.404"));
            console.log(err);
          });
      }
    });
  }
  private locate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        if (
          withinBoundingBox(
            position.coords.longitude,
            position.coords.latitude,
            this.props.map.location
          )
        ) {
          this.props.updatePan({
            viewport: {
              ...this.props.map.viewport,
              longitude: position.coords.longitude,
              latitude: position.coords.latitude
            }
          });
          if (this.map) {
            this.map.flyTo({
              center: [position.coords.longitude, position.coords.latitude]
            });
          }
        }
      });
    } else {
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
    if (this.map) {
      this.map.flyTo({
        center: [
          this.props.map.viewport.longitude,
          this.props.map.viewport.latitude
        ]
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
    { updatePan, updateCity }
  )(BaseMap)
);

export default MaposhMap;
