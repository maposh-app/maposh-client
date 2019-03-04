import { ILanguage } from "src/model/language";
import { IBoundingBox, ICity } from "src/model/location.js";
import { IViewport } from "src/model/viewport.js";
import config from "./default.json";

export function whichLanguage(id: string): ILanguage {
  const language: ILanguage = {
    id,
    name: config.locale.supported[id]
  };
  return language;
}

export function whichLanguages() {
  return config.locale.supported;
}

export function getViewport(): IViewport {
  return {
    latitude: config.map.latitude,
    longitude: config.map.longitude,
    zoom: config.map.zoom
  };
}

export function whichCity(): ICity {
  return config.map.locations.default;
}

export function whichCities() {
  return config.map.locations.cities;
}

export function getBoundary(city: string): IBoundingBox {
  return config.map.locations.cities[city];
}

export default config;
