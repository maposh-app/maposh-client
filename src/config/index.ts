import { IBoundingBox, ICity, ILocation } from "../model/location.js";
import { IViewport } from "../model/viewport.js";
import config from "./default.json";

export function getViewport(): IViewport {
  return {
    latitude: config.map.latitude,
    longitude: config.map.longitude,
    zoom: config.map.zoom
  };
}

export function getLanguages(): { [language: string]: string } {
  return config.locale.language;
}

export function getLanguage(id: string): string {
  return getLanguages()[id];
}

function getCities(): { [city: string]: number[] } {
  return config.map.locations.cities;
}

export function getLocations(): ILocation[] {
  const cities = getCities();
  const locations = [];
  for (const city of Object.keys(cities)) {
    locations.push({
      city: city as ICity,
      boundingBox: cities[city] as IBoundingBox
    });
  }
  return locations;
}

export function getBoundary(city: string): IBoundingBox {
  return getCities()[city] as IBoundingBox;
}

export function getDefaultCity(): ICity {
  return config.map.locations.default;
}

export function configureApiGateway(): {
  graphql_endpoint: string;
  graphql_endpoint_iam_region: string;
} {
  const stage = (process.env.REACT_APP_STAGE as string).toUpperCase();
  const url = process.env[`REACT_APP_${stage}_API_GATEWAY_URL`] || "";
  const region = process.env[`REACT_APP_${stage}_API_GATEWAY_REGION`] || "";
  return {
    graphql_endpoint: url,
    graphql_endpoint_iam_region: region
  };
}

export function configureAuth(): {
  region: string;
  userPoolId: string;
  identityPoolId: string;
  userPoolWebClientId: string;
} {
  const stage = (process.env.REACT_APP_STAGE as string).toUpperCase();
  const region = process.env[`REACT_APP_${stage}_COGNITO_REGION`] || "";
  const userPoolId =
    process.env[`REACT_APP_${stage}_COGNITO_USER_POOL_ID`] || "";
  const identityPoolId =
    process.env[`REACT_APP_${stage}_COGNITO_IDENTITY_POOL_ID`] || "";
  const userPoolWebClientId =
    process.env[`REACT_APP_${stage}_COGNITO_APP_CLIENT_ID`] || "";

  return {
    region,
    userPoolId,
    identityPoolId,
    userPoolWebClientId
  };
}

export default config;
