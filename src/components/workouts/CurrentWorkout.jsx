import { Card, CardContent, Grid, Typography, styled } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db/db";
import { useCallback } from "react";
import moment from "moment";

const CurrentWorkoutCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  backgroundColor: theme.palette.style.background,
  color: theme.palette.secondary.main,
  width: "100%",
}));

const CurrentWorkout = () => {
  const currentWorkoutId = window.localStorage.getItem("currentWorkout");
  const currentWorkout = useLiveQuery(() =>
    db.workouts.get(Number(currentWorkoutId))
  );

  const todaysExercise = useCallback(() => {
    if (currentWorkout) {
      return currentWorkout.sections?.find(
        (section) =>
          section.preferred_day == moment().format("dddd").toLowerCase()
      );
    }
    return false;
  }, [currentWorkout]);

  return (
    <>
      {Number(currentWorkoutId) ? (
        <CurrentWorkoutCard elevation={0}>
          <CardContent>
            <Grid container justifyContent="space-between" mb={2.5}>
              <Typography
                variant="h3"
                color={(theme) => theme.palette.primary.main}
              >
                {currentWorkout?.name}
              </Typography>
              <Typography variant="subtitle1">5 Weeks Streak</Typography>
            </Grid>
            {todaysExercise() ? (
              <>
                <Grid container mb={3} flexDirection={"column"}>
                  <Typography variant="body1" mb={1}>
                    {todaysExercise()?.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color={(theme) => theme.palette.style.paper}
                  >
                    {todaysExercise()?.description}
                  </Typography>
                </Grid>
                <Grid container spacing={1}>
                  {todaysExercise()?.exercises?.map((exercise, index) => (
                    <Grid item xs={12} key={index}>
                      <Grid container justifyContent={"space-between"}>
                        <Typography variant="body1">{exercise}</Typography>
                        <Typography variant="body1">3 Sets</Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              <Typography variant="subtitle2" fontStyle={"italic"}>
                Take a Rest Day Champ. You deserve it.
              </Typography>
            )}
          </CardContent>
        </CurrentWorkoutCard>
      ) : (
        <>
          <Typography variant="subtitle2" fontStyle={"italic"} color={"gray"}>
            No Workout Marked as{" "}
            <span style={{ color: "black", fontWeight: "600" }}>Current</span>
          </Typography>
        </>
      )}
    </>
  );
};

export default CurrentWorkout;
