import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ListItemRow from "../common/ListItemRow";

const ExerciseListItem = ({ exercise }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/muscle/${exercise}`);

  return <ListItemRow primary={exercise} handleClick={handleClick} />;
};

ExerciseListItem.propTypes = {
  exercise: PropTypes.string.isRequired,
};

export default ExerciseListItem;
