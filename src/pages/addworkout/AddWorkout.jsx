import { Grid, Typography } from "@mui/material";
import WorkoutForm from "../../components/workout/WorkoutForm";
import { useNavigate } from "react-router-dom";
import { db } from "../../db/db";

const AddWorkout = () => {
  const navigate = useNavigate();

  const addWorkoutButton = async (data) => {
    try {
      const id = await db.workouts.add({
        ...data
      })
      console.log(`Workout with Id: ${id} is added`);
    } catch (e) {
      console.log("Error:", e);
    }
    navigate("/workouts");
  }
  return (
    <Grid container spacing={3} p={2}>
      <Grid item xs={12}>
        <Typography variant="h1">Add Workout</Typography>
      </Grid>
      <Grid item xs={12}>
        <WorkoutForm submitFunction={addWorkoutButton} />
      </Grid>
    </Grid>
  )
}

export default AddWorkout;