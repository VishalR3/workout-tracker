import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";

const ExerciseListDetail = ({ exercise, handleClick = undefined }) => {
  const navigate = useNavigate();
  const handleClickEvent = async () => {
    if (handleClick) handleClick(exercise?.name);
    else navigate(`/exercise/${exercise?.name}`);
  };
  return (
    <Grid item>
      <Grid
        container
        spacing={1.5}
        flexWrap={"nowrap"}
        alignItems={"center"}
        onClick={handleClickEvent}
      >
        <Grid item>
          <Box
            sx={{
              height: "70px",
              aspectRatio: "16/9",
              borderRadius: "12px",
              // linear gradient with random angle each time, and a gradient between two off white colors, one almost white and other with different hues
              background: `linear-gradient(${exercise?.bgColor}
                )`,
            }}
            className="muscle-photo"
          />
        </Grid>
        <Grid item flexGrow={1}>
          <Typography fontSize={"1rem"} fontWeight={"600"}>
            {exercise?.name}
          </Typography>
          <Typography
            fontSize={"0.875rem"}
            color="#979797"
            fontWeight={"500"}
            textTransform={"capitalize"}
            mt={0.5}
          >
            {exercise?.equipment}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

ExerciseListDetail.propTypes = {
  exercise: PropTypes.object.isRequired,
  handleClick: PropTypes.func,
};

export default ExerciseListDetail;
