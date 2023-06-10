import { Grid, Typography } from "@mui/material";
import CurveGraph from "../../components/results/CurveGraph";
import Stats from "../../components/results/Stats";
import BarGraph from "../../components/results/BarGraph";
import Section from "../../components/options/Section";

const Results = () => {
  return (
    <Grid container spacing={3} p={2}>
      <Grid item xs={12}>
        <Typography variant="h1">Results</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3">Body Weight</Typography>
        <Grid container mt={2}>
          <CurveGraph />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3">Frequency</Typography>
        <Grid container mt={2}>
          <BarGraph />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3">Stats</Typography>
        <Grid
          container
          spacing={1.5}
          mt={2}
          flexWrap={"nowrap"}
          sx={{
            overflowX: "auto",
            scrollSnapType: "x mandatory",
          }}
        >
          <Grid item>
            <Stats
              sx={(theme) => ({
                backgroundColor: theme.palette.style.lightblue,
              })}
            />
          </Grid>
          <Grid item>
            <Stats
              sx={(theme) => ({
                backgroundColor: theme.palette.style.primary,
              })}
            />
          </Grid>
          <Grid item>
            <Stats
              sx={(theme) => ({
                backgroundColor: theme.palette.style.paper,
              })}
            />
          </Grid>
          <Grid item>
            <Stats
              sx={(theme) => ({
                backgroundColor: theme.palette.style.background,
              })}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3">Last Workout</Typography>
        <Grid container my={2}>
          <Section height="250px" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Results;
