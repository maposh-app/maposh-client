import { getBoundary } from "../../config";
import { ICity } from "../../model/location";
import { ILocationState, IViewportState, UPDATE_MAP } from "./types";

export function updatePan(newPan: IViewportState) {
  return {
    type: UPDATE_MAP,
    payload: newPan
  };
}

export function updateCity(newCity: ICity) {
  return {
    type: UPDATE_MAP,
    payload: {
      location: {
        city: newCity,
        boundingBox: getBoundary(newCity)
      }
    } as ILocationState
  };
}
