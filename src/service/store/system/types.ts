import { ILanguage } from "../../../model/language";

export interface ILanguageState {
  language: ILanguage;
}

export interface IAuthState {
  isAuthenticated: boolean;
}

export interface IPreferencesState {
  favourites: Set<string>;
  dislikes: Set<string>;
}

export type ISystemState = ILanguageState & IAuthState & IPreferencesState;

export const UPDATE_SESSION = "UPDATE_SESSION";

interface IUpdateSessionAction {
  type: typeof UPDATE_SESSION;
  payload: ISystemState;
}

export type SystemActionType = IUpdateSessionAction;
