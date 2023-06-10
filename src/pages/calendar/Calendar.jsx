import { Grid, Typography } from "@mui/material";
import Section from "../../components/options/Section";

const Calendar = () => {
  return (
    <Grid container spacing={3} p={2}>
      <Grid item xs={12}>
        <Typography variant="h1">Calendar</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Section height="350px" />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3">Workout History</Typography>
        <Grid container gap={2} my={2}>
          <Section height="120px" />
          <Section height="120px" />
          <Section height="120px" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Calendar;
