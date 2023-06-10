import { Grid, List, Typography } from "@mui/material";
import MockExercise from "../../components/exercises/MockExercise";
import ExerciseListItem from "../../components/exercises/ExerciseListItem";
import exerciseList from "../../assets/content/exerciseList.json";

const Exercises = () => {
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((exercise) => (
            <MockExercise key={exercise} />
          ))}
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
        <Grid container flexDirection={"column"} gap={1}>
          <Grid container justifyContent="space-between">
            <Typography variant="h3">Exercises</Typography>
            <Typography variant="subtitle1">Show All</Typography>
          </Grid>
          <List disablePadding>
            {Object.keys(exerciseList).map((exercise, index) => (
              <ExerciseListItem exercise={exercise} key={index} />
            ))}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Exercises;
