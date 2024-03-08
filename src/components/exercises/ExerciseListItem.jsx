import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";

const ExerciseListItem = ({ exercise }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/muscle/${exercise}`);

  return (
    <Grid item>
      <Grid
        container
        spacing={1.5}
        flexWrap={"nowrap"}
        alignItems={"center"}
        onClick={handleClick}
      >
        <Grid item>
          <Box
            sx={{
              height: "70px",
              aspectRatio: "16/9",
              borderRadius: "12px",
              // linear gradient with random angle each time, and a gradient between two off white colors, one almost white and other with different hues
              background: `linear-gradient(${Math.random() * 360}deg, hsl(${
                Math.random() * 360
              }deg, 0%, 90%) 0%, hsl(${
                Math.random() * 360
              }deg, 80%, 60%) 100%)`,
            }}
            classname="muscle-photo"
          />
        </Grid>
        <Grid item flexGrow={1}>
          <Typography fontSize={"1rem"} fontWeight={"600"}>
            {exercise}
          </Typography>
          <Typography fontSize={"0.875rem"} color="#979797" fontWeight={"500"}>
            10 exercises
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

ExerciseListItem.propTypes = {
  exercise: PropTypes.string.isRequired,
};

export default ExerciseListItem;
