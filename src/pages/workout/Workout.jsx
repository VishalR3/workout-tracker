import { Chip, Fab, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db/db";
import WorkoutSectionListItem from "../../components/workout/WorkoutSectionListItem";
import { Check, Favorite } from "@mui/icons-material";
import { useCallback } from "react";
import { defaultConfig } from "../../assets/config";
import { useState } from "react";

const Workout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const workout = useLiveQuery(() => db.workouts.get(Number(id)));

  const ls = window.localStorage;

  const [currentWorkout, setCurrentWorkout] = useState(
    ls.getItem("currentWorkout")
  );

  const isCurrentWorkout = useCallback(
    () => Number(currentWorkout) === Number(workout?.id),
    [workout, currentWorkout]
  );
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
  const markCurrent = async (value) => {
    ls.setItem(
      "currentWorkout",
      value ? workout?.id : defaultConfig.currentWorkout
    );
    setCurrentWorkout(ls.getItem("currentWorkout"));
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
          sx={{
            position: "absolute",
            bottom: 72,
            left: 16,
          }}
          aria-label="Mark Current"
          variant="extended"
          color={isCurrentWorkout() ? "info" : undefined}
          onClick={() => markCurrent(isCurrentWorkout() ? false : true)}
        >
          {isCurrentWorkout() ? <Check sx={{ mr: 1 }} /> : ""}
          {isCurrentWorkout() ? "Current" : "Mark Current"}
        </Fab>
        <Fab
          sx={{ position: "absolute", bottom: 72, right: 16 }}
          aria-label="Mark Favorite"
          // color={workout?.isFavorite ? undefined : "primary"}
          onClick={() => markFavorite(workout?.isFavorite ? false : true)}
        >
          <Favorite color={workout?.isFavorite ? "error" : undefined} />
        </Fab>
      </Grid>
    </Grid>
  );
};

export default Workout;
