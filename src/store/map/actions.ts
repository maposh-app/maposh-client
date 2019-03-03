import { IMapState, UPDATE_MAP } from "./types";

export function updateMap(newMap: IMapState) {
  return {
    type: UPDATE_MAP,
    payload: newMap
  };
}
