import { getBoundary, getViewport, whichCity } from "../../config";
import { IMapState, MapActionType, UPDATE_MAP } from "./types";

const defaultCity = whichCity();
const initialSystemState: IMapState = {
  viewport: getViewport(),
  location: { city: defaultCity, boundingBox: getBoundary(defaultCity) }
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
