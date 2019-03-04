import { ILocationState, IViewportState, UPDATE_MAP } from "./types";

export function updatePan(newPan: IViewportState) {
  return {
    type: UPDATE_MAP,
    payload: newPan
  };
}

export function updateLocation(newLocation: ILocationState) {
  return {
    type: UPDATE_MAP,
    payload: newLocation
  };
}
