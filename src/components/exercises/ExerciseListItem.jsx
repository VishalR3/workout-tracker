import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const ExerciseListItem = ({ exercise }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/muscle/${exercise?.name}`);
  const exercises = useSelector(
    (state) => state.exercises.muscles[exercise?.name]
  );

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
              background: `linear-gradient(${exercise?.bgColor})`,
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
            mt={0.5}
          >
            {exercises?.length ? exercises.length + " exercises" : ""}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

ExerciseListItem.propTypes = {
  exercise: PropTypes.object.isRequired,
};

export default ExerciseListItem;
