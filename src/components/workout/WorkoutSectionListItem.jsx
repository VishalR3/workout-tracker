import { NavigateNext } from "@mui/icons-material";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const WorkoutSectionListItem = ({ section, workoutId, index }) => {
  const navigate = useNavigate();
  return (
    <ListItem
      sx={{
        backgroundColor: "#E6E6E6",
        mb: "10px",
        cursor: "pointer",
      }}
      onClick={() => navigate(`/workout/${workoutId}/${index + 1}`)}
    >
      <ListItemText
        primary={section.name}
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

WorkoutSectionListItem.propTypes = {
  section: PropTypes.object.isRequired,
  workoutId: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default WorkoutSectionListItem;
