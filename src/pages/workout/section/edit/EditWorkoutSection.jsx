import { useCallback } from "react";
import { Chip, Grid, List, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../../db/db";
import exerciseList from "../../../../assets/content/exerciseList.json";
import MuscleGroupForEdit from "../../../../components/workout/section/edit/MuscleGroupForEdit";
import { useState } from "react";
import ExerciseListDetail from "../../../../components/muscle/ExerciseListDetail";
import { NavigateBefore } from "@mui/icons-material";
import { useEffect } from "react";
import EditableExerciseItem from "../../../../components/workout/section/edit/EditableExerciseItem";

const EditWorkoutSection = () => {
  const { id, sectionId } = useParams();
  const navigate = useNavigate();
  const [muscleGroupSelected, setMuscleGroupSelected] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
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
        <Grid container flexDirection={"column"} gap={1}>
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
                <Typography variant="subtitle1">Show All</Typography>
              </>
            )}
          </Grid>
          <List disablePadding>
            {!muscleGroupSelected
              ? Object.keys(exerciseList).map((muscleGroup, index) => (
                  <MuscleGroupForEdit
                    muscleGroup={muscleGroup}
                    setMuscleGroupSelected={setMuscleGroupSelected}
                    key={index}
                  />
                ))
              : exerciseList[muscleGroupSelected].map((exercise, index) => (
                  <ExerciseListDetail
                    exercise={exercise}
                    handleClick={selectExercise}
                    key={index}
                  />
                ))}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditWorkoutSection;
