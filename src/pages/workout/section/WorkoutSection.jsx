import { useCallback } from "react";
import { Chip, Grid, IconButton, List, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import ExerciseListDetail from "../../../components/muscle/ExerciseListDetail";
import { db } from "../../../db/db";
import { ArrowBackIos } from "@mui/icons-material";

const WorkoutSection = () => {
  const { id, sectionId } = useParams();
  const navigate = useNavigate();
  const workout = useLiveQuery(() => db.workouts.get(Number(id)));
  const section = useCallback(() => {
    if (workout && sectionId) return workout?.sections[sectionId - 1];
    else return false;
  }, [workout, sectionId]);
  return (
    <Grid container spacing={3} p={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between">
          <IconButton
            sx={{ p: 0 }}
            color="primary"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIos />
          </IconButton>
          <Typography variant="h1">{section()?.name}</Typography>
          <Chip
            label="Edit"
            sx={{ px: 1 }}
            onClick={() => navigate(`/workout/${id}/${sectionId}/edit`)}
          />
        </Grid>
        <Typography variant="body1" mt={1}>
          {section()?.description}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <List disablePadding>
          {section()?.exercises?.map((exercise, index) => (
            <ExerciseListDetail exercise={exercise} key={index} />
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default WorkoutSection;
