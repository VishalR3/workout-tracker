import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ListItemRow from "../common/ListItemRow";

const WorkoutListItem = ({ workout }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/workout/${workout.id}`);
  return <ListItemRow primary={workout.name} handleClick={handleClick} />;
};

WorkoutListItem.propTypes = {
  workout: PropTypes.object.isRequired,
};

export default WorkoutListItem;
