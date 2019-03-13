import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

import { mapReducer } from "../../service/store/map/reducers";
import { systemReducer } from "../../service/store/system/reducers";

const rootReducer = combineReducers({
  system: systemReducer,
  map: mapReducer
});

export type MaposhState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}
