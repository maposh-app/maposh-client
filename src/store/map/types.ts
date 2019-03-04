import { ILocation } from "src/model/location";
import { IViewport } from "src/model/viewport";

export interface IViewportState {
  viewport: IViewport;
}

export interface ILocationState {
  location: ILocation;
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

export type IMapState = IViewportState & ILocationState;

export type MapActionType = IUpdateViewportAction | IUpdateLocationAction;
