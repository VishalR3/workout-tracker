import { createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query } from "firebase/firestore";
import { fireDB } from "../../../firebase/config";
import { db } from "../../../db/db";

const initialState = {
  exercises: [],
  muscles: {},
  exercisesForSection: [],
};

export const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    setExercises: (state, action) => {
      state.exercises = action.payload;
    },
    setExercisesByMuscle: (state, action) => {
      state.muscles = action.payload;
    },
    setExercisesForSection: (state, action) => {
      state.exercisesForSection = state.exercises.filter((exercise) =>
        action.payload.includes(exercise.name)
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { setExercises, setExercisesByMuscle, setExercisesForSection } =
  exercisesSlice.actions;

export default exercisesSlice.reducer;

// get Exercises from firebase using firestore query and set them as exercises
export const getExercises = () => async (dispatch) => {
  // fetch only if there are no exercises

  const exercises = await db.exercises.toArray();

  dispatch(setExercises(exercises));
  setExercisesForMuscles(exercises, dispatch);

  try {
    const q = query(collection(fireDB, "Exercises"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let bgColor = `${Math.random() * 360}deg, hsl(0deg, 0%, 90%) 0%, hsl(${
        Math.random() * 360
      }deg, 80%, 60%) 100%`;
      let exercise = {
        id: doc.id,
        exercise_id: doc.id,
        ...doc.data(),
        bgColor: bgColor,
      };
      if (!db.exercises.get({ exercise_id: exercise.id })) {
        db.exercises.add({
          ...exercise,
          id: undefined,
        });
        exercises.push(exercise);
      }
    });

    dispatch(setExercises(exercises));
    setExercisesForMuscles(exercises, dispatch);
  } catch (e) {
    console.log(e);
  }
};

const setExercisesForMuscles = (exercises, dispatch) => {
  // separate exercises by exercise.main_muscle and save it in exercises by muscle
  const muscles = {};
  exercises.forEach((exercise) => {
    if (!muscles[exercise.main_muscle]) {
      muscles[exercise.main_muscle] = [];
    }
    muscles[exercise.main_muscle].push(exercise);
  });
  dispatch(setExercisesByMuscle(muscles));
};
