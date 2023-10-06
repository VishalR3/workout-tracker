import { Chip, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ExerciseListDetail from "../../components/muscle/ExerciseListDetail";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db/db";

const Workout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const workout = useLiveQuery(() => db.workouts.get(Number(id)));
  return (
    <Grid container spacing={3} p={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between">
          <Typography variant="h1">{workout?.name}</Typography>
          <Chip label="Edit" sx={{ px: 1 }} onClick={() => navigate(`/edit/workout/${workout.id}`)} />
        </Grid>
      </Grid>
      <Grid item xs={12} >
        {workout?.sections.map((section, index) => (
          <ExerciseListDetail exercise={section.name} key={index} />
        ))}
      </Grid>
    </Grid>
  )
}

export default Workout;