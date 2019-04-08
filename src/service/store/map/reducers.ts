import { getBoundary, getDefaultCity, getViewport } from "../../../config";
import {
  IMapState,
  MapActionType,
  UPDATE_MAP
} from "../../../service/store/map/types";

const defaultCity = getDefaultCity();
const initialSystemState: IMapState = {
  viewport: getViewport(),
  location: { city: defaultCity, boundingBox: getBoundary(defaultCity) },
  placesCache: {},
  maposhPlaces: new Set<string>()
};

export function mapReducer(
  state = initialSystemState,
  action: MapActionType
): IMapState {
  switch (action.type) {
    case UPDATE_MAP: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
}
