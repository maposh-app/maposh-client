import { GraphQLResult } from "@aws-amplify/api/lib/types";
import { API, graphqlOperation } from "aws-amplify";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { getBoundary } from "../../../config";
import { ICity } from "../../../model/location";
import { IPlace } from "../../../model/place";
import { MaposhState } from "../../../service/store";
import {
  ILocationState,
  IPlacesState,
  IViewportState,
  UPDATE_MAP
} from "../../../service/store/map/types";
import queries from "../../../utils/extract/queries";
import { union } from "../../../utils/transform";
import { IPreferencesState, UPDATE_SESSION } from "../system/types";

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

export function updateRank(): ThunkAction<
  void,
  MaposhState,
  null,
  Action<typeof UPDATE_SESSION | typeof UPDATE_MAP>
> {
  return (dispatch, getState) => {
    const { map } = getState();
    return (API.graphql(
      graphqlOperation(queries.getMaposhPlaces(map.location.city))
    ) as Promise<GraphQLResult>)
      .then((result: any) => {
        if (result.data.meInfo) {
          dispatch({
            type: UPDATE_SESSION,
            payload: {
              favourites: new Set<string>(
                result.data.meInfo.favourites.map(
                  (place: { placeID: string }) => place.placeID
                )
              ),
              dislikes: new Set<string>(
                result.data.meInfo.dislikes.map(
                  (place: { placeID: string }) => place.placeID
                )
              )
            } as IPreferencesState
          });
        }
        if (result.data.getPlaces) {
          const newPlaces = new Set<string>(
            result.data.getPlaces.map((place: IPlace) => place.placeID)
          );
          const newPlacesDict = map.placesCache;
          result.data.getPlaces.forEach((place: IPlace) => {
            newPlacesDict[place.placeID] = {
              ...place,
              ...newPlacesDict[place.placeID],
              upvoteCount: place.upvoteCount
            };
          });

          return dispatch({
            type: UPDATE_MAP,
            payload: {
              placesCache: newPlacesDict,
              maposhPlaces: union<string>(map.maposhPlaces, newPlaces)
            } as IPlacesState
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
}
