import { where } from "../../config";
import { IMapState, MapActionType, UPDATE_MAP } from "./types";

const initialSystemState: IMapState = {
  viewport: where()
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
