import { API, graphqlOperation } from "aws-amplify";
import axios from "axios";
import { FeatureCollection, Polygon } from "geojson";
import config from "../../config";
import { IPlace } from "../../model/place";
import { mutations, percentage2color } from "../transform";

export class RecommendationsLoader {
  private apiURL: string;
  private credentials: string;
  private limit: string;
  constructor() {
    this.apiURL = config.map.foursquare.recommendations_url;
    const clientSecret = process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET || "";
    const clientID = process.env.REACT_APP_FOURSQUARE_CLIENT_ID || "";
    this.limit = `limit=${config.map.foursquare.limit}`;
    this.credentials = `client_secret=${clientSecret}&client_id=${clientID}`;
  }
  public recommend(
    where: FeatureCollection,
    city: string,
    intent: string
  ): Promise<IPlace[]> {
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
    const request = `${this.apiURL}?${query}`;
    let numUnknown = 0;
    return axios
      .get(request)
      .then(res => {
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
            color: percentage2color(
              ((venues.length - idx) / venues.length) * 100
            ),
            rating: info.venue.rating,
            photo
          };
          return place;
        });
      })
      .then(async (places: IPlace[]) => {
        return await Promise.all(
          places.map(async (place: IPlace) => {
            try {
              const result = await (API.graphql(
                graphqlOperation(mutations.getMaposhScore(place.placeID))
              ) as any);
              if (result.data && result.data.getPlaceInfo) {
                place.maposhRating = result.data.getPlaceInfo.upvoteCount;
              }
            } catch {
              ++numUnknown;
              place.maposhRating = 0;
            }
            return place;
          })
        );
      })
      .catch(err => {
        console.log(`Have found ${numUnknown} unknown places...`);
        console.log(err);
        throw err;
      });
  }
}
