import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ListItemRow from "../common/ListItemRow";

const WorkoutSectionListItem = ({ section, workoutId, index }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/workout/${workoutId}/${index + 1}`);
  return <ListItemRow primary={section.name} handleClick={handleClick} />;
};

WorkoutSectionListItem.propTypes = {
  section: PropTypes.object.isRequired,
  workoutId: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default WorkoutSectionListItem;
