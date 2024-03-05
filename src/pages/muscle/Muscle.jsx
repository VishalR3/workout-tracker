import { Grid, List, Typography } from "@mui/material";
import { Await, useLoaderData, useParams } from "react-router-dom";
import ExerciseListDetail from "../../components/muscle/ExerciseListDetail";
import { Suspense } from "react";
import RowSkeleton from "./RowSkeleton";

const Muscle = () => {
  const { name } = useParams();
  const { exercises } = useLoaderData();
  return (
    <Grid container spacing={3} p={2}>
      <Grid item xs={12}>
        <Typography variant="h1">{name}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container flexDirection={"column"} gap={1}>
          <Suspense fallback={<RowSkeleton />}>
            <Await resolve={exercises}>
              {(resolvedExercises) => (
                <List disablePadding>
                  {resolvedExercises?.docs?.map((exercise, index) => (
                    <ExerciseListDetail
                      exercise={exercise.data().name}
                      key={index}
                    />
                  ))}
                </List>
              )}
            </Await>
          </Suspense>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Muscle;
