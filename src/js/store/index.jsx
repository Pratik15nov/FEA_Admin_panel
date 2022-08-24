import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import rootReducer from "../reducer";

const reducer = combineReducers({
  users: rootReducer,
});

const store = configureStore({
    reducer
});
    

export default store;
