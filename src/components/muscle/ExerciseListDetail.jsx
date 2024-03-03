import { NavigateNext } from "@mui/icons-material";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ExerciseListDetail = ({ exercise }) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    navigate(`/exercise/${exercise}`);
  };
  return (
    <ListItem
      sx={{
        backgroundColor: "#E6E6E6",
        mb: "10px",
        cursor: "pointer",
      }}
      onClick={handleClick}
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

ExerciseListDetail.propTypes = {
  exercise: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

export default ExerciseListDetail;
