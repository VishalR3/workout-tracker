import { useCallback } from "react";
import { Chip, Grid, List, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../../db/db";
import MuscleGroupForEdit from "../../../../components/workout/section/edit/MuscleGroupForEdit";
import { useState } from "react";
import ExerciseListDetail from "../../../../components/muscle/ExerciseListDetail";
import { NavigateBefore } from "@mui/icons-material";
import { useEffect } from "react";
import EditableExerciseItem from "../../../../components/workout/section/edit/EditableExerciseItem";
import { MUSCLES } from "../../../../assets/content/muscles";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fireDB } from "../../../../firebase/config";

const EditWorkoutSection = () => {
  const { id, sectionId } = useParams();
  const navigate = useNavigate();
  const [muscleGroupSelected, setMuscleGroupSelected] = useState(false);
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
    const exercises = [];
    if (muscleGroupSelected) {
      const q = query(
        collection(fireDB, "Exercises"),
        where("main_muscle", "==", muscleGroupSelected)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        exercises.push({ id: doc.id, ...doc.data() });
      });
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
              ? MUSCLES?.map((muscleGroup, index) => (
                  <MuscleGroupForEdit
                    muscleGroup={muscleGroup.name}
                    setMuscleGroupSelected={setMuscleGroupSelected}
                    key={index}
                  />
                ))
              : exerciseList?.map((exercise, index) => (
                  <ExerciseListDetail
                    exercise={exercise.name}
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
