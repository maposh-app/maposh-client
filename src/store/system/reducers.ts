import config from "../../config";
import { ISystemState, SystemActionType, UPDATE_SESSION } from "./types";

const initialSystemState: ISystemState = {
  language: config.locale.default
};

export function systemReducer(
  state = initialSystemState,
  action: SystemActionType
): ISystemState {
  switch (action.type) {
    case UPDATE_SESSION: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
}
