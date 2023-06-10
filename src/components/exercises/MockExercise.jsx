import PropTypes from "prop-types";

const MockExercise = ({ variant }) => {
  return (
    <div
      className="mock-exercise"
      style={{ backgroundColor: variant ? "#A3C6C8" : "#F9B485" }}
    />
  );
};

MockExercise.propTypes = {
  variant: PropTypes.bool,
};

export default MockExercise;
