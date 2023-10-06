import { Chip, Grid, List, Typography } from "@mui/material";
import MockExercise from "../../components/exercises/MockExercise";
import CurrentWorkout from "../../components/workouts/CurrentWorkout";
import WorkoutListItem from "../../components/workouts/WorkoutListItem";
import { useNavigate } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db/db";

const Workouts = () => {
  const navigate = useNavigate();
  // const workouts = ["Push Pull Legs", "Upper Lower", "Full Body", "Bro Split"];
  const workouts = useLiveQuery(() => db.workouts.toArray());
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
            <Chip size="small" label="Add Workout" sx={{ px: 1 }} onClick={() => navigate("/add/workout")} />
          </Grid>
          <List disablePadding>
            {workouts?.map((workout, index) => (
              <WorkoutListItem workout={workout} key={index} />
            ))}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Workouts;
