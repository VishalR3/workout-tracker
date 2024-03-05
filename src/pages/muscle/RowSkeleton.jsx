import { Grid, Skeleton } from "@mui/material";

const RowSkeleton = () => {
  return (
    <Grid container direction={"column"} spacing={1}>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <Grid item key={index}>
            <Skeleton variant="rectangular" height={50} />
          </Grid>
        ))}
    </Grid>
  );
};

export default RowSkeleton;
