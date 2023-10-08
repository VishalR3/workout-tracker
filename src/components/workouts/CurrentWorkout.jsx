import { Card, CardContent, Grid, Typography, styled } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db/db";

const CurrentWorkoutCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  backgroundColor: theme.palette.style.background,
  color: theme.palette.secondary.main,
}));

const workout = {
  name: "Push Pull Legs",
  streak: 5,
  section: {
    title: "Push",
    description:
      "Push exercises are those where the muscles contract when weight is pushed away from the body (think bench press).",
  },
  exercises: [
    {
      name: "Bench Press",
      sets: [
        {
          reps: 10,
          weight: 135,
        },
        {
          reps: 10,
          weight: 135,
        },
        {
          reps: 10,
          weight: 135,
        },
      ],
    },
    {
      name: "Squat",
      sets: [
        {
          reps: 10,
          weight: 135,
        },
        {
          reps: 10,
          weight: 135,
        },
        {
          reps: 10,
          weight: 135,
        },
      ],
    },
    {
      name: "Deadlift",
      sets: [
        {
          reps: 10,
          weight: 135,
        },
        {
          reps: 10,
          weight: 135,
        },
        {
          reps: 10,
          weight: 135,
        },
      ],
    },
  ],
};

const CurrentWorkout = () => {
  const currentWorkoutId = window.localStorage.getItem("currentWorkout");
  const currentWorkout = useLiveQuery(() =>
    db.workouts.get(Number(currentWorkoutId))
  );

  return (
    <CurrentWorkoutCard elevation={0}>
      <CardContent>
        <Grid container justifyContent="space-between" mb={2.5}>
          <Typography
            variant="h3"
            color={(theme) => theme.palette.primary.main}
          >
            {currentWorkout?.name}
          </Typography>
          <Typography variant="subtitle1">
            {workout.streak} Weeks Streak
          </Typography>
        </Grid>
        <Grid container mb={3} flexDirection={"column"}>
          <Typography variant="body1" mb={1}>
            {workout.section.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color={(theme) => theme.palette.style.paper}
          >
            {workout.section.description}
          </Typography>
        </Grid>
        <Grid container spacing={1}>
          {workout.exercises.map((exercise, index) => (
            <Grid item xs={12} key={index}>
              <Grid container justifyContent={"space-between"}>
                <Typography variant="body1">{exercise.name}</Typography>
                <Typography variant="body1">
                  {exercise.sets.length} Sets
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </CurrentWorkoutCard>
  );
};

export default CurrentWorkout;
