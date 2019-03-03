import {
  ILanguageState,
  ISystemState,
  UPDATE_SESSION
} from "./types";

export function updateSession(newSession: ISystemState) {
  return {
    type: UPDATE_SESSION,
    payload: newSession
  };
}

export function updateLanguage(newLanguage: ILanguageState) {
  return {
    type: UPDATE_SESSION,
    payload: newLanguage
  };
}
