import { NavigateNext } from "@mui/icons-material";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const WorkoutListItem = ({ workout }) => {
  const navigate = useNavigate();
  return (
    <ListItem
      sx={{
        backgroundColor: "#E6E6E6",
        mb: "6px",
        cursor: 'pointer',
      }}
      onClick={() => navigate(`/workout/${workout.id}`)}
    >
      <ListItemText primary={workout.name} secondary={workout?.description} />
      <ListItemIcon sx={{ justifyContent: "flex-end" }}>
        <NavigateNext color="primary" />
      </ListItemIcon>
    </ListItem>
  );
};

WorkoutListItem.propTypes = {
  workout: PropTypes.object.isRequired,
};

export default WorkoutListItem;
