import {
  ILanguageState,
  ISystemState,
  IUserState,
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

export function updateUserStatus(newStatus: IUserState) {
  return {
    type: UPDATE_SESSION,
    payload: newStatus
  };
}
