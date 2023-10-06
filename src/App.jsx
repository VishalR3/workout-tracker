import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { workerContext } from "./workerContext";
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
      },
      {
        path: "/add/workout",
        element: <AddWorkout />,
      }
    ],
  },
]);

function App() {
  const appWorker = useMemo(() => new Worker("./worker.js"), []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <workerContext.Provider value={appWorker}>
          <RouterProvider router={router} />
        </workerContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
