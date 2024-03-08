import { Grid, List, Typography } from "@mui/material";
import MockExercise from "../../components/exercises/MockExercise";
import ExerciseListItem from "../../components/exercises/ExerciseListItem";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db/db";
import { useCallback } from "react";
import moment from "moment";
import ExerciseCard from "../../components/exercises/ExerciseCard";
import { MUSCLES } from "../../assets/content/muscles";

const Exercises = () => {
  const currentWorkoutId = window.localStorage.getItem("currentWorkout");
  const currentWorkout = useLiveQuery(() =>
    db.workouts.get(Number(currentWorkoutId))
  );

  const todaysExercise = useCallback(() => {
    if (currentWorkout) {
      return currentWorkout.sections?.find(
        (section) =>
          section.preferred_day == moment().format("dddd").toLowerCase()
      );
    }
    return false;
  }, [currentWorkout]);

  return (
    <Grid container spacing={3} p={2}>
      <Grid item xs={12}>
        <Typography variant="h1">Exercises</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3">Exercises For Today</Typography>
        <Grid
          container
          flexWrap={"nowrap"}
          sx={{
            overflowX: "auto",
            scrollSnapType: "x mandatory",
          }}
          gap={2}
          mt={2}
        >
          {todaysExercise() ? (
            todaysExercise()?.exercises?.map((exercise) => (
              <ExerciseCard exercise={exercise} key={exercise} />
            ))
          ) : (
            <Typography variant="subtitle2" fontStyle={"italic"} color={"gray"}>
              Take a Rest Day Champ. You deserve it.
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3">Recently Done Exercises</Typography>
        <Grid
          container
          flexWrap={"nowrap"}
          sx={{
            overflowX: "auto",
            scrollSnapType: "x mandatory",
          }}
          gap={2}
          mt={2}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((exercise) => (
            <MockExercise variant={true} key={exercise} />
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container flexDirection={"column"} spacing={2}>
          <Grid item>
            <Grid container justifyContent="space-between">
              <Typography variant="h3">Exercises</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column" spacing={2}>
              {MUSCLES.map((muscle, index) => (
                <ExerciseListItem exercise={muscle.name} key={index} />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Exercises;
