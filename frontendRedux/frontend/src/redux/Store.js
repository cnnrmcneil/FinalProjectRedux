// import { createStore } from "@reduxjs/toolkit";
import { UserReducer } from "./reducers/UserReducer";
import { LoginReducer } from "./reducers/LoginReducer";
import { CollectionReducer } from "./reducers/CollectionReducer";
import { NewCollectionReducer } from "./reducers/NewCollectionReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";

// export const store = createStore({
//   UserReducer,
// });

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      UserReducer,
      LoginReducer,
      CollectionReducer,
      NewCollectionReducer,
    })
  );
  return store;
};
