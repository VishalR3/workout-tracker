import { NavigateNext } from "@mui/icons-material";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PropTypes from "prop-types";

const MuscleGroupForEdit = ({ muscleGroup, setMuscleGroupSelected }) => {
  return (
    <ListItem
      sx={{
        backgroundColor: "#E6E6E6",
        mb: "6px",
        cursor: "pointer",
      }}
      onClick={() => setMuscleGroupSelected(muscleGroup)}
    >
      <ListItemText primary={muscleGroup} />
      <ListItemIcon sx={{ justifyContent: "flex-end" }}>
        <NavigateNext color="primary" />
      </ListItemIcon>
    </ListItem>
  );
};

MuscleGroupForEdit.propTypes = {
  muscleGroup: PropTypes.object.isRequired,
  setMuscleGroupSelected: PropTypes.func.isRequired,
};

export default MuscleGroupForEdit;
