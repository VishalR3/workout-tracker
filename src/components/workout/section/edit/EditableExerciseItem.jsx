import { RemoveCircle } from "@mui/icons-material";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PropTypes from "prop-types";

const EditableExerciseItem = ({
  exercise,
  selectedExercises,
  setSelectedExercises,
  index,
}) => {
  const removeExercise = () => {
    selectedExercises.splice(index, 1);
    setSelectedExercises([...selectedExercises]);
  };

  return (
    <ListItem
      sx={{
        backgroundColor: "#E6E6E6",
        mb: "6px",
        cursor: "pointer",
      }}
    >
      <ListItemIcon>
        <RemoveCircle color="error" onClick={removeExercise} />
      </ListItemIcon>
      <ListItemText primary={exercise} />
    </ListItem>
  );
};

EditableExerciseItem.propTypes = {
  exercise: PropTypes.string.isRequired,
  selectedExercises: PropTypes.array.isRequired,
  setSelectedExercises: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default EditableExerciseItem;
