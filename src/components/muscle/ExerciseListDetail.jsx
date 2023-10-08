import { NavigateNext } from "@mui/icons-material";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PropTypes from "prop-types";

const ExerciseListDetail = ({ exercise, handleClick = undefined }) => {
  return (
    <ListItem
      sx={{
        backgroundColor: "#E6E6E6",
        mb: "6px",
        cursor: "pointer",
      }}
      onClick={() => handleClick(exercise)}
    >
      <ListItemText primary={exercise} />
      <ListItemIcon sx={{ justifyContent: "flex-end" }}>
        <NavigateNext color="primary" />
      </ListItemIcon>
    </ListItem>
  );
};

ExerciseListDetail.propTypes = {
  exercise: PropTypes.object.isRequired,
  handleClick: PropTypes.func,
};

export default ExerciseListDetail;
