import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

const WorkoutListItem = ({ workout }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/workout/${workout.id}`);
  return (
    <Grid item xs={6} onClick={handleClick}>
      <Grid
        container
        flexDirection={"column"}
        gap={0.8}
        sx={{
          border: "1px solid #ccc",
          p: 2,
          borderRadius: "0.75rem",
          height: "100%",
        }}
      >
        <Typography fontSize={"1rem"} fontWeight={"bold"}>
          {workout?.name}
        </Typography>
        <Typography fontSize={"0.75rem"} color="#6f6f6f">
          {workout?.sections?.length} sections
        </Typography>
      </Grid>
    </Grid>
  );
};

WorkoutListItem.propTypes = {
  workout: PropTypes.object.isRequired,
};

export default WorkoutListItem;
