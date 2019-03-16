import { ILanguage } from "../../../model/language";

export interface ILanguageState {
  language: ILanguage;
}

export const SIGN_IN = "SIGN_IN";
export const CONFIRM_SIGN_IN = "SIGN_IN";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const SIGN_OUT = "SIGN_OUT";

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
