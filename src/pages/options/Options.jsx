import { Grid, Typography } from "@mui/material";
import CurveGraph from "../../components/results/CurveGraph";

const Options = () => {
  return (
    <Grid container spacing={3} p={2}>
      <Grid item xs={12}>
        <Typography variant="h1">Options</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3">Your Settings</Typography>
        <Grid container mt={2}>
          <CurveGraph />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3">App Settings</Typography>
        <Grid container mt={2}>
          <CurveGraph height="300px" />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h3">Legal</Typography>
        <Grid container mt={2}>
          <CurveGraph height="80px" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Options;
