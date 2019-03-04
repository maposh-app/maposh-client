import i18n from "../i18n";

export type ILanguage = string;
export interface ILanguageLabel {
  value: ILanguage;
  label: string;
}
export interface ITranslate {
  translate: i18n.TFunction;
  context: i18n.i18n;
}
