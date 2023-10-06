import { Grid, List, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import exerciseList from "../../assets/content/exerciseList.json";
import ExerciseListDetail from "../../components/muscle/ExerciseListDetail";

const Muscle = () => {
  const { name } = useParams();
  return (
    <Grid container spacing={3} p={2}>
      <Grid item xs={12}>
        <Typography variant="h1">{name}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container flexDirection={"column"} gap={1}>
          <List disablePadding>
            {exerciseList[name].map((exercise, index) => (
              <ExerciseListDetail exercise={exercise} key={index} />
            ))}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Muscle;