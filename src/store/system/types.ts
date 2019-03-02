import { ILanguage } from "src/model/language";

export interface ISystemState {
  language: ILanguage;
}

export const UPDATE_SESSION = "UPDATE_SESSION";

interface IUpdateSessionAction {
  type: typeof UPDATE_SESSION;
  payload: ISystemState;
}

export type SystemActionType = IUpdateSessionAction;
