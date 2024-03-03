import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Exercises from "./pages/exercises/Exercises";
import Workouts from "./pages/workouts/Workouts";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import Results from "./pages/results/Results";
import Options from "./pages/options/Options";
import Calendar from "./pages/calendar/Calendar";
import Muscle from "./pages/muscle/Muscle";
import AddWorkout from "./pages/addworkout/AddWorkout";
import Workout from "./pages/workout/Workout";
import EditWorkout from "./pages/editWorkout/EditWorkout";
import WorkoutSection from "./pages/workout/section/WorkoutSection";
import EditWorkoutSection from "./pages/workout/section/edit/EditWorkoutSection";
import { useEffect } from "react";
import { defaultConfig } from "./assets/config";
import ExerciseDetail from "./components/exercises/exercise/ExerciseDetail";
import { exerciseLoader } from "./components/exercises/exercise/Loader";
import { muscleLoader } from "./components/muscle/MuscleLoader";
import AddWorkoutData from "./pages/addWorkoutData/AddWorkoutData";
import ExerciseDescription from "./components/exercises/exercise/ExerciseDescription";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Exercises />,
      },
      {
        path: "/workouts",
        element: <Workouts />,
      },
      {
        path: "/results",
        element: <Results />,
      },
      {
        path: "/calendar",
        element: <Calendar />,
      },
      {
        path: "/options",
        element: <Options />,
      },
      {
        path: "/muscle/:name",
        element: <Muscle />,
        loader: muscleLoader,
      },
      {
        path: "/add/workout",
        element: <AddWorkout />,
      },
      {
        path: "/workout/:id",
        element: <Workout />,
      },
      {
        path: "/edit/workout/:id",
        element: <EditWorkout />,
      },
      {
        path: "/workout/:id/:sectionId",
        element: <WorkoutSection />,
      },
      {
        path: "/workout/:id/:sectionId/edit",
        element: <EditWorkoutSection />,
      },
      {
        path: "/exercise/:name",
        element: <ExerciseDetail />,
        loader: exerciseLoader,
        children: [
          {
            path: "/exercise/:name",
            element: <ExerciseDescription />,
            loader: exerciseLoader,
          },
          {
            path: "/exercise/:name/addWorkoutData",
            element: <AddWorkoutData />,
            loader: exerciseLoader,
          },
        ],
      },
    ],
  },
]);

function App() {
  const ls = window.localStorage;
  const checkConfigExists = () => {
    if (ls.getItem("currentWorkout")) return true;
    return false;
  };
  const storeConfig = () => {
    if (!checkConfigExists()) {
      ls.setItem("currentWorkout", defaultConfig.currentWorkout);
    }
  };
  useEffect(() => {
    storeConfig();
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
