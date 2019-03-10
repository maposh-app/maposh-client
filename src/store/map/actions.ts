import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { MaposhState } from "..";
import { getBoundary } from "../../config";
import { ICity } from "../../model/location";
import { ILocationState, IViewportState, UPDATE_MAP } from "./types";

export function updatePan(newPan: IViewportState) {
  return {
    type: UPDATE_MAP,
    payload: newPan
  };
}

export function updateCity(
  newCity: ICity
): ThunkAction<void, MaposhState, null, Action<typeof UPDATE_MAP>> {
  return (dispatch, getState) => {
    const { map } = getState();
    const newBoundary = getBoundary(newCity);
    const [, , , , cityCenterLongitude, cityCenterLatitude] = newBoundary;
    return dispatch({
      type: UPDATE_MAP,
      payload: {
        location: {
          city: newCity,
          boundingBox: newBoundary
        },
        viewport: {
          longitude: cityCenterLongitude,
          latitude: cityCenterLatitude,
          zoom: map.viewport.zoom
        }
      } as ILocationState
    });
  };
}
