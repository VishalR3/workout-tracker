import { configureStore } from "@reduxjs/toolkit";
import exercisesReducer from "./features/exercises/exercisesSlice";
import muscleReducer from "./features/muscles/muscleSlice";

export const store = configureStore({
  reducer: {
    exercises: exercisesReducer,
    muscles: muscleReducer,
  },
});
