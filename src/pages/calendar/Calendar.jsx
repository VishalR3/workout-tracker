import { Grid, Typography } from "@mui/material";
import CurveGraph from "../../components/results/CurveGraph";

const Calendar = () => {
  return (
    <Grid container spacing={3} p={2}>
      <Grid item xs={12}>
        <Typography variant="h1">Calendar</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <CurveGraph height="350px" />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3">Workout History</Typography>
        <Grid container gap={2} mt={2}>
          <CurveGraph height="120px" />
          <CurveGraph height="120px" />
          <CurveGraph height="120px" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Calendar;
