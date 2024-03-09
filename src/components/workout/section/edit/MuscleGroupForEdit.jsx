import { NavigateNext } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";

const MuscleGroupForEdit = ({ muscleGroup, setMuscleGroupSelected }) => {
  return (
    <Grid item onClick={() => setMuscleGroupSelected(muscleGroup)}>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          backgroundColor: "#E6E6E6",
          p: "0.5rem 1rem",
          cursor: "pointer",
        }}
      >
        <Typography>{muscleGroup}</Typography>
        <NavigateNext color="primary" />
      </Grid>
    </Grid>
  );
};

MuscleGroupForEdit.propTypes = {
  muscleGroup: PropTypes.string.isRequired,
  setMuscleGroupSelected: PropTypes.func.isRequired,
};

export default MuscleGroupForEdit;
