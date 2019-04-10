import { GraphQLResult } from "@aws-amplify/api/lib/types";
import { API, graphqlOperation } from "aws-amplify";
import { Action } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { getBoundary } from "../../../config";
import { ICity } from "../../../model/location";
import { IPlace } from "../../../model/place";
import { MaposhState } from "../../../service/store";
import {
  ILocationState,
  IMapState,
  IPlacesState,
  IViewportState,
  UPDATE_MAP
} from "../../../service/store/map/types";
import queries from "../../../utils/extract/queries";
import { mutations } from "../../../utils/transform";
import {
  IPreferencesState,
  ISystemState,
  UPDATE_SESSION
} from "../system/types";

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

function queryMaposhData(
  map: IMapState,
  dispatch: ThunkDispatch<
    {
      system: ISystemState;
      map: IMapState;
    },
    null,
    Action<"UPDATE_MAP" | "UPDATE_SESSION">
  >
) {
  return (API.graphql(
    graphqlOperation(queries.getMaposhPlaces(map.location.city))
  ) as Promise<GraphQLResult>)
    .then((result: any) => {
      if (result.data.meInfo) {
        dispatch({
          type: UPDATE_SESSION,
          payload: {
            likes: new Set<string>(
              result.data.meInfo.likes.map(
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
            ...newPlacesDict[place.placeID],
            ...place
          };
        });

        return dispatch({
          type: UPDATE_MAP,
          payload: {
            placesCache: newPlacesDict,
            maposhPlaces: newPlaces
          } as IPlacesState
        });
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
}

export function updateRank(): ThunkAction<
  void,
  MaposhState,
  null,
  Action<typeof UPDATE_SESSION | typeof UPDATE_MAP>
> {
  return (dispatch, getState) => {
    const { map } = getState();
    return queryMaposhData(map, dispatch);
  };
}

export function like(
  placeID: string,
  name: string,
  longitude?: number,
  latitude?: number
): ThunkAction<
  void,
  MaposhState,
  null,
  Action<typeof UPDATE_SESSION | typeof UPDATE_MAP>
> {
  return (dispatch, getState) => {
    const { map, system } = getState();
    const extra = system.dislikes.has(placeID) ? 1 : 0;
    return (API.graphql(
      graphqlOperation(
        mutations.like(
          placeID,
          name,
          map.location.city,
          longitude,
          latitude,
          extra
        )
      )
    ) as Promise<GraphQLResult>)
      .then(() => {
        return queryMaposhData(map, dispatch);
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function dislike(
  placeID: string,
  name: string,
  longitude?: number,
  latitude?: number
): ThunkAction<
  void,
  MaposhState,
  null,
  Action<typeof UPDATE_SESSION | typeof UPDATE_MAP>
> {
  return (dispatch, getState) => {
    const { map, system } = getState();
    const extra = system.likes.has(placeID) ? -1 : 0;
    return (API.graphql(
      graphqlOperation(
        mutations.dislike(
          placeID,
          name,
          map.location.city,
          longitude,
          latitude,
          extra
        )
      )
    ) as Promise<GraphQLResult>)
      .then(() => {
        return queryMaposhData(map, dispatch);
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function forgetLike(
  placeID: string
): ThunkAction<
  void,
  MaposhState,
  null,
  Action<typeof UPDATE_SESSION | typeof UPDATE_MAP>
> {
  return (dispatch, getState) => {
    const { map } = getState();
    return (API.graphql(
      graphqlOperation(mutations.forgetLike(placeID))
    ) as Promise<GraphQLResult>)
      .then(() => {
        return queryMaposhData(map, dispatch);
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function forgetDislike(
  placeID: string
): ThunkAction<
  void,
  MaposhState,
  null,
  Action<typeof UPDATE_SESSION | typeof UPDATE_MAP>
> {
  return (dispatch, getState) => {
    const { map } = getState();
    return (API.graphql(
      graphqlOperation(mutations.forgetDislike(placeID))
    ) as Promise<GraphQLResult>)
      .then(() => {
        return queryMaposhData(map, dispatch);
      })
      .catch(err => {
        console.log(err);
      });
  };
}
