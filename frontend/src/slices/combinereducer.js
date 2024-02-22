import { combineReducers } from "@reduxjs/toolkit";
import { Questionapi } from "./questionlist";
import quizreducerslice from "./quizreducerslice";
const rootreducer = combineReducers({
  [Questionapi.reducerPath]: Questionapi.reducer,
  quiz: quizreducerslice,
});

export default rootreducer;
