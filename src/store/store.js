import { configureStore } from "@reduxjs/toolkit";
import exercisesReducer from "./features/exercises/exercisesSlice";

export const store = configureStore({
  reducer: {
    exercises: exercisesReducer,
  },
});
