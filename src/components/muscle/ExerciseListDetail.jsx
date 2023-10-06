import { NavigateNext } from "@mui/icons-material";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";

const ExerciseListDetail = ({ exercise }) => {
  // const navigate = useNavigate();
  return (
    <ListItem
      sx={{
        backgroundColor: "#E6E6E6",
        mb: "6px",
        // cursor: 'pointer',
      }}
    // onClick={() => navigate(`/muscle/${exercise}`)}
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
};

export default ExerciseListDetail;
