import { Chip, Fab, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db/db";
import WorkoutSectionListItem from "../../components/workout/WorkoutSectionListItem";
import { Favorite } from "@mui/icons-material";

const Workout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const workout = useLiveQuery(() => db.workouts.get(Number(id)));

  const markFavorite = async (value) => {
    try {
      const workoutId = await db.workouts.update(Number(id), {
        ...workout,
        isFavorite: value,
      });
      console.log(`Workout with Id: ${workoutId} is Updated`);
    } catch (e) {
      console.log("Error:", e);
    }
  };

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
        <Fab
          sx={{ position: "absolute", bottom: 72, right: 16 }}
          aria-label="Mark Favorite"
          // color={workout?.isFavorite ? undefined : "primary"}
          onClick={() => markFavorite(workout?.isFavorite ? false : true)}
        >
          <Favorite color={workout?.isFavorite ? "primary" : undefined} />
        </Fab>
      </Grid>
    </Grid>
  );
};

export default Workout;
