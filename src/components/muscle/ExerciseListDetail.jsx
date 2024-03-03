import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ListItemRow from "../common/ListItemRow";

const ExerciseListDetail = ({ exercise, handleClick = undefined }) => {
  const navigate = useNavigate();
  const handleClickEvent = async () => {
    if (handleClick) handleClick(exercise);
    else navigate(`/exercise/${exercise}`);
  };
  return <ListItemRow primary={exercise} handleClick={handleClickEvent} />;
};

ExerciseListDetail.propTypes = {
  exercise: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

export default ExerciseListDetail;
