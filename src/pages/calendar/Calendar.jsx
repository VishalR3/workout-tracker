import { Box, Grid, Typography } from "@mui/material";
import Section from "../../components/options/Section";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Calendar = () => {
  return (
    <Grid container spacing={3} p={2}>
      <Grid item xs={12}>
        <Typography variant="h1">Calendar</Typography>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ borderRadius: "12px", backgroundColor: "#fff" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
        </Box>
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
