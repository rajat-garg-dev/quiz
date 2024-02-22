import { combineReducers } from "@reduxjs/toolkit";
import { Questionapi } from "./questionlist";

const rootreducer = combineReducers({
  [Questionapi.reducerPath]: Questionapi.reducer,
});

export default rootreducer;
