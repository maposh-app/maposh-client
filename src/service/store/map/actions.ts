import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { getBoundary } from "../../../config";
import { ICity } from "../../../model/location";
import { MaposhState } from "../../../service/store";
import {
  ILocationState,
  IPlacesState,
  IViewportState,
  UPDATE_MAP
} from "../../../service/store/map/types";

export function updatePan(newPan: IViewportState) {
  return {
    type: UPDATE_MAP,
    payload: newPan
  };
}

export function updatePlaces(newPlaces: IPlacesState) {
  return {
    type: UPDATE_MAP,
    payload: newPlaces
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
