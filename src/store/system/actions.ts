import { ISystemState, UPDATE_SESSION } from "./types";

export function updateSession(newSession: ISystemState) {
  return {
    type: UPDATE_SESSION,
    payload: newSession
  };
}
