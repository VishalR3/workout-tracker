import { PlayArrow } from "@mui/icons-material";
import { Box, Button, Grid, Typography, styled } from "@mui/material";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

export const GoBtn = styled(Button)({
  backgroundColor: "#ffb68461",
  fontWeight: "bold",
  borderBlockEnd: "3px solid #f4711a",
});

const ExerciseDescription = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const { exercise } = useLoaderData();
  const handleAddWorkoutDataClick = () => {
    navigate(`/exercise/${name}/addWorkoutData`);
  };
  return (
    <>
      <Grid item xs={12}>
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <Grid
              container
              direction="column"
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography variant="h4">LEVEL</Typography>
              <Typography
                variant="h3"
                color={"primary.contrastText"}
                textTransform={"uppercase"}
              >
                {exercise?.difficulty}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography variant="h4">EQUIPMENT</Typography>
              <Typography
                variant="h3"
                color={"primary.contrastText"}
                textTransform={"uppercase"}
              >
                {exercise?.equipment}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <GoBtn
          variant="contained"
          fullWidth
          size="large"
          disableElevation
          endIcon={<PlayArrow />}
          onClick={handleAddWorkoutDataClick}
        >
          {`Let's Go`}
        </GoBtn>
      </Grid>
      <Grid item xs={12} mt={1}>
        <Typography variant="h2" fontWeight={500} textTransform={"uppercase"}>
          Description
        </Typography>
        <Box
          sx={(theme) => ({
            p: 2,
            mt: 1.5,
            backgroundColor: theme.palette.style.neutral,
            color: theme.palette.style.background,
            borderInlineStart: `3px solid ${theme.palette.primary.main}`,
          })}
        >
          <Typography variant="body2">{exercise?.description} </Typography>
        </Box>
      </Grid>
    </>
  );
};

export default ExerciseDescription;
