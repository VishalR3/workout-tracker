import { Grid, List, Typography } from "@mui/material";
import { useLoaderData, useParams } from "react-router-dom";
import ExerciseListDetail from "../../components/muscle/ExerciseListDetail";

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
          <List disablePadding>
            {exercises.map((exercise, index) => (
              <ExerciseListDetail exercise={exercise.name} key={index} />
            ))}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Muscle;
