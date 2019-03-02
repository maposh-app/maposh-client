import { ILanguage } from "src/model/language";
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

export default config;
