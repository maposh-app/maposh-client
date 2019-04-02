import { ILocation } from "../../../model/location";
import { IPlace } from "../../../model/place";
import { IViewport } from "../../../model/viewport";

export interface IViewportState {
  viewport: IViewport;
}

export interface ILocationState {
  location: ILocation;
}

export interface IPlacesState {
  places: { [id: string]: IPlace };
}

export const UPDATE_MAP = "UPDATE_MAP";

interface IUpdateViewportAction {
  type: typeof UPDATE_MAP;
  payload: IViewportState;
}

interface IUpdateLocationAction {
  type: typeof UPDATE_MAP;
  payload: ILocationState;
}

interface IUpdatePlacesAction {
  type: typeof UPDATE_MAP;
  payload: IPlacesState;
}

export type IMapState = IViewportState & ILocationState & IPlacesState;

export type MapActionType =
  | IUpdateViewportAction
  | IUpdateLocationAction
  | IUpdatePlacesAction;
