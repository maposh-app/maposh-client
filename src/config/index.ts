import { ILanguage } from "src/model/language";
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

export function where(): IViewport {
  return {
    latitude: config.map.latitude,
    longitude: config.map.longitude,
    zoom: config.map.zoom
  };
}

export default config;
