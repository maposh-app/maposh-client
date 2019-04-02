import {
  IAuthState,
  ILanguageState,
  IPreferencesState,
  ISystemState,
  UPDATE_SESSION
} from "../../../service/store/system/types";

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

export function updateAuthStatus(newStatus: IAuthState) {
  return {
    type: UPDATE_SESSION,
    payload: newStatus
  };
}

export function updatePreferences(newPreferences: IPreferencesState) {
  return {
    type: UPDATE_SESSION,
    payload: newPreferences
  };
}
