import { Grid, Typography } from "@mui/material";
import WorkoutForm from "../../components/workout/WorkoutForm";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../db/db";
import { useLiveQuery } from "dexie-react-hooks";

const EditWorkout = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const workout = useLiveQuery(() => db.workouts.get(Number(id)));

  const editWorkoutButton = async (data) => {
    try {
      const workoutId = await db.workouts.update(Number(id), {
        ...data,
      });
      console.log(`Workout with Id: ${workoutId} is Updated`);
    } catch (e) {
      console.log("Error:", e);
    }
    navigate(`/workout/${id}`);
  };
  return (
    <Grid container spacing={3} p={2}>
      <Grid item xs={12}>
        <Typography variant="h1">Edit Workout</Typography>
      </Grid>
      <Grid item xs={12}>
        <WorkoutForm workout={workout} submitFunction={editWorkoutButton} />
      </Grid>
    </Grid>
  );
};

export default EditWorkout;
