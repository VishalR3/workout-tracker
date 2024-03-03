import { NavigateNext } from "@mui/icons-material";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ExerciseListItem = ({ exercise }) => {
  const navigate = useNavigate();
  return (
    <ListItem
      sx={{
        backgroundColor: "#E6E6E6",
        mb: "10px",
        cursor: "pointer",
      }}
      onClick={() => navigate(`/muscle/${exercise}`)}
    >
      <ListItemText
        primary={exercise}
        primaryTypographyProps={{
          fontSize: "1rem",
        }}
      />
      <ListItemIcon sx={{ justifyContent: "flex-end" }}>
        <NavigateNext color="primary" />
      </ListItemIcon>
    </ListItem>
  );
};

ExerciseListItem.propTypes = {
  exercise: PropTypes.string.isRequired,
};

export default ExerciseListItem;
