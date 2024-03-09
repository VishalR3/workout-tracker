import { createSlice } from "@reduxjs/toolkit";
import { MUSCLES } from "../../../assets/content/muscles";

const initialState = {
  muscles: [],
};

export const muscleSlice = createSlice({
  name: "muscles",
  initialState,
  reducers: {
    setMuscles: (state, action) => {
      state.muscles = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMuscles } = muscleSlice.actions;

export default muscleSlice.reducer;

export const getMuscles = () => async (dispatch) => {
  const muscles = [];

  MUSCLES.forEach((muscle) => {
    let bgColor = `${Math.random() * 360}deg, hsl(0deg, 0%, 90%) 0%, hsl(${
      Math.random() * 360
    }deg, 80%, 60%) 100%`;
    muscles.push({ ...muscle, bgColor: bgColor });
  });

  dispatch(setMuscles(muscles));
};
