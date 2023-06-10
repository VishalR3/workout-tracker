import { Chip, Grid, List, Typography } from "@mui/material";
import MockExercise from "../../components/exercises/MockExercise";
import ExerciseListItem from "../../components/exercises/ExerciseListItem";
import CurrentWorkout from "../../components/workouts/CurrentWorkout";

const Workouts = () => {
  const workouts = ["Push Pull Legs", "Upper Lower", "Full Body", "Bro Split"];
  return (
    <Grid container spacing={3} p={2}>
      <Grid item xs={12}>
        <Typography variant="h1">Workouts</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2">Current Workout</Typography>
        <Grid container mt={2}>
          <CurrentWorkout />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3">Favorite Workouts</Typography>
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
            <MockExercise key={exercise} />
          ))}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container flexDirection={"column"} gap={1}>
          <Grid container justifyContent="space-between" alignItems={"center"}>
            <Typography variant="h3">Workouts</Typography>
            <Chip size="small" label="Add Workout" sx={{ px: 1 }} />
          </Grid>
          <List disablePadding>
            {workouts.map((workout, index) => (
              <ExerciseListItem exercise={workout} key={index} />
            ))}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Workouts;
