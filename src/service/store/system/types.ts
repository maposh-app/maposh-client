import { ILanguage } from "../../../model/language";

export interface ILanguageState {
  language: ILanguage;
}

export interface IUserState {
  isAuthenticated: boolean;
}

export type ISystemState = ILanguageState & IUserState;

export const UPDATE_SESSION = "UPDATE_SESSION";

interface IUpdateSessionAction {
  type: typeof UPDATE_SESSION;
  payload: ISystemState;
}

export type SystemActionType = IUpdateSessionAction;
