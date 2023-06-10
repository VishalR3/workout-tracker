import { Box, styled } from "@mui/material";

const StyledDiv = styled(Box)(() => ({
  width: "100px",
  height: "100px",
  aspectRatio: "1/1",
  borderRadius: "12px",
}));
const Stats = (props) => {
  return <StyledDiv {...props} />;
};

export default Stats;
