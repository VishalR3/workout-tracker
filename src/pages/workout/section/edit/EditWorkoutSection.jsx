import { useCallback } from "react";
import { Chip, Grid, List, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavigateBefore } from "@mui/icons-material";
import { db } from "../../../../db/db";
import MuscleGroupForEdit from "../../../../components/workout/section/edit/MuscleGroupForEdit";
import ExerciseListDetail from "../../../../components/muscle/ExerciseListDetail";
import EditableExerciseItem from "../../../../components/workout/section/edit/EditableExerciseItem";
import { MUSCLES } from "../../../../assets/content/muscles";

const EditWorkoutSection = () => {
  const { id, sectionId } = useParams();
  const navigate = useNavigate();
  const [muscleGroupSelected, setMuscleGroupSelected] = useState(false);
  const exercisesByMuscles = useSelector((state) => state.exercises.muscles);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [exerciseList, setExerciseList] = useState([]);
  const workout = useLiveQuery(() => db.workouts.get(Number(id)));
  const section = useCallback(() => {
    if (workout && sectionId) return workout?.sections[sectionId - 1];
    else return false;
  }, [workout, sectionId]);

  const selectExercise = (exercise) => {
    setSelectedExercises([...selectedExercises, exercise]);
  };

  const saveSection = async () => {
    const updatedWorkout = { ...workout };
    updatedWorkout.sections[sectionId - 1] = {
      ...workout?.sections[sectionId - 1],
      exercises: selectedExercises,
    };
    try {
      const workoutId = await db.workouts.update(Number(id), {
        ...updatedWorkout,
      });
      console.log(`Workout with Id: ${workoutId} is Updated`);
    } catch (e) {
      console.log("Error:", e);
    }
    navigate(`/workout/${workout?.id}`);
  };

  const exercisesForSelectedMuscleGroup = useCallback(async () => {
    let exercises = [];
    if (muscleGroupSelected) {
      exercises = exercisesByMuscles[muscleGroupSelected];
    }
    return exercises;
  }, [muscleGroupSelected]);

  useEffect(() => {
    exercisesForSelectedMuscleGroup().then((res) => {
      setExerciseList(res);
    });
  }, [muscleGroupSelected]);

  useEffect(() => {
    if (workout)
      setSelectedExercises(workout?.sections[sectionId - 1].exercises || []);
  }, [workout]);

  return (
    <Grid container spacing={3} p={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between">
          <Typography variant="h1">Edit {section()?.name}</Typography>
          <Chip label="Save" sx={{ px: 1 }} onClick={saveSection} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <List disablePadding>
          {selectedExercises?.map((exercise, index) => (
            <EditableExerciseItem
              exercise={exercise}
              selectedExercises={selectedExercises}
              setSelectedExercises={setSelectedExercises}
              index={index}
              key={index}
            />
          ))}
        </List>
      </Grid>
      <Grid item xs={12}>
        <Grid container flexDirection={"column"} spacing={2}>
          <Grid item>
            <Grid container justifyContent="space-between">
              {muscleGroupSelected ? (
                <Chip
                  icon={<NavigateBefore />}
                  color={"primary"}
                  variant="outlined"
                  label={muscleGroupSelected}
                  sx={{ px: 1 }}
                  onClick={() => setMuscleGroupSelected(false)}
                />
              ) : (
                <>
                  <Typography variant="h3">Exercises</Typography>
                </>
              )}
            </Grid>
          </Grid>
          <Grid item>
            <Grid container flexDirection={"column"} spacing={2}>
              {!muscleGroupSelected
                ? MUSCLES?.map((muscleGroup, index) => (
                    <MuscleGroupForEdit
                      muscleGroup={muscleGroup.name}
                      setMuscleGroupSelected={setMuscleGroupSelected}
                      key={index}
                    />
                  ))
                : exerciseList?.map((exercise, index) => (
                    <ExerciseListDetail
                      exercise={exercise}
                      handleClick={selectExercise}
                      key={index}
                    />
                  ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditWorkoutSection;
