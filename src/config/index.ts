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

export default config;
