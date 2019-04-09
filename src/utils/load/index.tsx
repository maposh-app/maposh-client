import { API, graphqlOperation } from "aws-amplify";
import axios, { AxiosResponse } from "axios";
import { FeatureCollection, Polygon } from "geojson";
import * as _ from "lodash";
import config from "../../config";
import { IPlace } from "../../model/place";
import MaposhStore from "../../service/store";
import { updatePlaces } from "../../service/store/map/actions";
import { IPlacesState } from "../../service/store/map/types";
import { updatePreferences } from "../../service/store/system/actions";
import { percentage2color } from "../transform";
import queries from "../extract/queries";

export class RecommendationsLoader {
  public language: string;
  private searchURL: string;
  private recommenderURL: string;
  private credentials: string;
  private limit: string;

  constructor(language: string) {
    this.recommenderURL = config.map.foursquare.recommendations_url;
    this.searchURL = config.map.foursquare.search_url;
    const clientSecret = process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET || "";
    const clientID = process.env.REACT_APP_FOURSQUARE_CLIENT_ID || "";
    this.limit = `limit=${config.map.foursquare.limit}`;
    this.credentials = `client_secret=${clientSecret}&client_id=${clientID}`;
    this.language = language;
  }

  public searchByAddress(
    placeName: string,
    address: string,
    longitude: number,
    latitude: number
  ) {
    const name = `name=${placeName}`;
    const location = `address=${address}`;
    const ll = `ll=${latitude},${longitude}`;
    const why = `intent=match`;
    const version = `v=${new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "")}`;
    const query = [
      this.credentials,
      name,
      ll,
      location,
      why,
      this.limit,
      version
    ].join("&");
    const request = `${this.recommenderURL}?${query}`;
    return axios
      .get(request, {
        headers: {
          "Accept-Language": this.language
        }
      })
      .then(res => this.parse(res))
      .then((places: IPlace[]) => this.checkMaposh(places))
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  public recommend(where: FeatureCollection, city: string, intent: string) {
    const polygon = where.features
      .map(feature => {
        const coordinates = (feature.geometry as Polygon).coordinates.pop();
        return coordinates
          ? coordinates
              .map((pair: number[]) => {
                return pair.reverse().join(",");
              })
              .join(";")
          : "";
      })
      .join(";");

    const near = `near=${city}`;
    const why = `intent=${intent}`;
    const focus = `polygon=${polygon}`;
    const version = `v=${new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "")}`;
    const query = [
      this.credentials,
      near,
      this.limit,
      why,
      focus,
      version
    ].join("&");
    const request = `${this.recommenderURL}?${query}`;
    return axios
      .get(request, {
        headers: {
          "Accept-Language": this.language
        }
      })
      .then(res => this.parse(res))
      .then((places: IPlace[]) => this.checkMaposh(places))
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  private parse(res: AxiosResponse<any>) {
    const venues = res.data.response.group.results;
    return venues.map((info: any, idx: number) => {
      const photo =
        (info.photo &&
          info.photo.prefix &&
          info.photo.suffix &&
          `${info.photo.prefix}${config.map.foursquare.photo_side}x${
            config.map.foursquare.photo_side
          }${info.photo.suffix}`) ||
        undefined;
      const place: IPlace = {
        name: info.venue.name || "",
        placeID: info.venue.id || "",
        city: info.venue.location.city || "",
        address: info.venue.location.address || "",
        longitude: info.venue.location.lng || "",
        latitude: info.venue.location.lat || "",
        color: percentage2color(((venues.length - idx) / venues.length) * 100),
        foursquareRating: info.venue.rating,
        photo
      };
      return place;
    });
  }

  private async checkMaposh(places: IPlace[]) {
    const maposhQueries: string =
      places
        .map((place: IPlace) => {
          return `id${_.camelCase(place.placeID)}: getPlaceInfo(placeID: "${
            place.placeID
          }") { upvoteCount }`;
        })
        .join("\n") + queries.meInfoFragment;

    const result = (await API.graphql(
      graphqlOperation(`{${maposhQueries}}`)
    )) as any;
    if (result.data) {
      const maposhMapData = MaposhStore.getState().map;
      const maposhPlacesCache = maposhMapData.placesCache;
      if (result.data.meInfo) {
        MaposhStore.dispatch(
          updatePreferences({
            likes: new Set<string>(
              result.data.meInfo.likes.map(
                (place: { placeID: string }) => place.placeID
              )
            ),
            dislikes: new Set<string>(
              result.data.meInfo.dislikes.map(
                (place: { placeID: string }) => place.placeID
              )
            )
          })
        );
      }
      const placesDict = places.reduce(
        (dict: IPlacesState["placesCache"], place: IPlace) => {
          const maposhPlaceData =
            result.data[`id${_.camelCase(place.placeID)}`];
          if (maposhPlaceData) {
            place.upvoteCount = maposhPlaceData.upvoteCount;
          }
          dict[place.placeID] = place;
          return dict;
        },
        {}
      );
      MaposhStore.dispatch(
        updatePlaces({
          ...maposhMapData,
          placesCache: { ...maposhPlacesCache, ...placesDict }
        })
      );
    }

    return places.map(place => place.placeID);
  }
}
