import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { rootReducer } from "../reducer";
// import { applyMiddleware } from "redux";
import { loggerMiddleware } from "../middleware";

const reducer = combineReducers(rootReducer);
// const middleware = applyMiddleware(loggerMiddleware);
const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(loggerMiddleware);

const store = configureStore({
  reducer,
  middleware,
});

export default store;
