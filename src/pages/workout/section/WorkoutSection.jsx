import { useCallback, useEffect } from "react";
import { Chip, Grid, IconButton, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import ExerciseListDetail from "../../../components/muscle/ExerciseListDetail";
import { db } from "../../../db/db";
import { ArrowBackIos } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setExercisesForSection } from "../../../store/features/exercises/exercisesSlice";

const WorkoutSection = () => {
  const { id, sectionId } = useParams();
  const exercises = useSelector((state) => state.exercises.exercisesForSection);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const workout = useLiveQuery(() => db.workouts.get(Number(id)));

  const section = useCallback(() => {
    if (workout && sectionId) {
      return workout?.sections[sectionId - 1];
    } else return false;
  }, [workout, sectionId]);

  useEffect(() => {
    if (section() && section().exercises) {
      dispatch(setExercisesForSection(section().exercises));
    }
  }, [section]);
  return (
    <Grid container spacing={3} p={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" alignItems={"center"}>
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
        <Typography fontWeight={"500"} color="#9e9e9e" mt={2}>
          {section()?.description}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {exercises.map((exercise, index) => (
            <ExerciseListDetail exercise={exercise} key={index} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WorkoutSection;
