import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

const WorkoutSectionListItem = ({ section, workoutId, index }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/workout/${workoutId}/${index + 1}`);

  return (
    <Grid
      item
      onClick={handleClick}
      sx={{ border: "1px solid #ccc", p: 2, borderRadius: "0.75rem" }}
    >
      <Grid container flexDirection={"column"} gap={1}>
        <Grid container justifyContent={"space-between"}>
          <Typography
            fontSize={"0.75rem"}
            fontWeight={"500"}
            color={"#424242"}
            textTransform={"capitalize"}
          >
            {section?.preferred_day}
          </Typography>
          <Typography fontSize={"0.75rem"} fontWeight={"500"} color={"#6f6f6f"}>
            {section?.exercises?.length} exercises
          </Typography>
        </Grid>
        <Typography fontSize={"1.25rem"} fontWeight={"bold"}>
          {section?.name}
        </Typography>
        <Typography fontSize={"0.75rem"} color="#6f6f6f" mt={0.5}>
          {section?.exercises?.reduce(
            (acc, exercise, i) =>
              acc + exercise + (i < section?.exercises?.length - 1 ? ", " : ""),
            ""
          )}
        </Typography>
      </Grid>
    </Grid>
  );
};

WorkoutSectionListItem.propTypes = {
  section: PropTypes.object.isRequired,
  workoutId: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default WorkoutSectionListItem;
