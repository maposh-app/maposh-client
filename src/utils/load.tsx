import axios from "axios";
import { FeatureCollection, Polygon } from "geojson";
import config from "../config";
import { IPlace } from "../model/place";

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
  public async recommend(
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
    // const why = `intent=${intent}`;
    const why = `section=${intent}`;
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
    console.log(request);
    return axios
      .get(request)
      .then(res => {
        const venues = res.data.response.group.results;
        return venues.map((info: any) => {
          const place: IPlace = {
            name: info.venue.name || "",
            placeID: info.venue.id || "",
            city: info.venue.location.city || "",
            address: info.venue.location.address || "",
            longitude: info.venue.location.lng || "",
            latitude: info.venue.location.lat || "",
            rating: info.venue.rating
          };
          return place;
        });
      })
      .catch(err => {
        throw err.response.data;
      });
  }
}
