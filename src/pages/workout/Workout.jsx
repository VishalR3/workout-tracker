import { Chip, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db/db";
import WorkoutSectionListItem from "../../components/workout/WorkoutSectionListItem";

const Workout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const workout = useLiveQuery(() => db.workouts.get(Number(id)));
  return (
    <Grid container spacing={3} p={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between">
          <Typography variant="h1">{workout?.name}</Typography>
          <Chip
            label="Edit"
            sx={{ px: 1 }}
            onClick={() => navigate(`/edit/workout/${workout?.id}`)}
          />
        </Grid>
        <Typography variant="body1" mt={1}>
          {workout?.description}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {workout?.sections.map((section, index) => (
          <WorkoutSectionListItem
            section={section}
            workoutId={workout?.id}
            index={index}
            key={index}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default Workout;
