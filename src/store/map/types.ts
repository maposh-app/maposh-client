import { IViewport } from "src/model/viewport";

export interface IViewportState {
  viewport: IViewport;
}

export type IMapState = IViewportState;

export const UPDATE_MAP = "UPDATE_MAP";

interface IUpdateViewportAction {
  type: typeof UPDATE_MAP;
  payload: IViewportState;
}

export type MapActionType = IUpdateViewportAction;
