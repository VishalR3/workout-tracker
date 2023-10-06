import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ExerciseListDetail from "../../components/muscle/ExerciseListDetail";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db/db";

const Workout = () => {
  const { id } = useParams();
  const workout = useLiveQuery(() => db.workouts.get(Number(id)));
  console.log(workout, id)
  return (
    <Grid container spacing={3} p={2}>
      <Grid item xs={12}>
        <Typography variant="h1">{workout?.name}</Typography>
      </Grid>
      {workout?.sections.map((section, index) => (
        <Grid item xs={12} key={index}>
          <ExerciseListDetail exercise={section.name} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Workout;