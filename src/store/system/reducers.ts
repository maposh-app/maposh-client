import config from "../../config";
import { ISystemState, SystemActionType, UPDATE_SESSION } from "./types";

export const initialSystemState: ISystemState = {
  language: {
    id: config.locale.default,
    name: config.locale.supported[config.locale.default]
  }
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
