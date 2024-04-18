import { Grid, Typography } from "@mui/material";
import ExerciseForm from "../../components/exercises/add/ExerciseForm";

const AddExercise = () => {
  return (
    <Grid container spacing={3} p={2}>
      <Grid item xs={12}>
        <Typography variant="h1">Add Exercise</Typography>
      </Grid>
      <Grid item xs={12}>
        <ExerciseForm />
      </Grid>
    </Grid>
  );
};

export default AddExercise;
