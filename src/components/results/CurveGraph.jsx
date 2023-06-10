const CurveGraph = ({ height = "150px" }) => {
  return (
    <svg width={"100%"} height={height}>
      <rect width={"100%"} height={height} fill="#E6E6E6" rx={12} ry={12} />
    </svg>
  );
};

export default CurveGraph;
