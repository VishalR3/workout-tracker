import PropTypes from "prop-types";

const ExerciseCard = ({ exercise }) => {
  return (
    <div
      className="mock-exercise"
      style={{
        backgroundColor: "#F9B485",
        padding: "1rem",
        boxSizing: "border-box",
        color: "white",
        fontWeight: "600",
        aspectRatio: "unset",
      }}
    >
      {exercise}
    </div>
  );
};

ExerciseCard.propTypes = {
  exercise: PropTypes.string.isRequired,
};

export default ExerciseCard;
