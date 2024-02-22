import { configureStore } from "@reduxjs/toolkit";
import rootreducer from "./slices/combinereducer";
import { Questionapi } from "./slices/questionlist";

export const store = configureStore({
  reducer: rootreducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Questionapi.middleware),
});
