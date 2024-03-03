import { Outlet, useLoaderData, useParams } from "react-router-dom";
import { Box, Chip, Grid, Typography, styled } from "@mui/material";

const MuscleChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "type",
})(({ type }) => ({
  borderRadius: "4px",
  fontWeight: "500",
  backgroundColor: type == "main" ? "#ffb68461" : undefined,
  color: type == "main" ? "#f4711a" : undefined,
  textTransform: "capitalize",
}));

const ExerciseDetail = () => {
  const { exercise } = useLoaderData();
  const { name } = useParams();

  return (
    <Grid container spacing={3} p={2}>
      <Grid item xs={12}>
        <iframe
          src={exercise?.video}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            width: "100%",
            aspectRatio: "16/9",
            borderRadius: "12px",
          }}
        ></iframe>
      </Grid>
      <Grid item xs={12}>
        <Grid container direction={"column"} spacing={1}>
          <Grid item>
            <Typography variant="h1">{name}</Typography>
          </Grid>
          <Grid item>
            <Grid container gap={1}>
              <MuscleChip
                label={exercise?.main_muscle}
                size="small"
                type="main"
              />
              {exercise?.supp_muscles_targeted
                ?.split(",")
                ?.map((muscle, index) => (
                  <MuscleChip key={index} label={muscle} size="small" />
                ))}
            </Grid>
            <Box
              sx={{
                mt: 2,
                mb: -1,
                width: "100%",
                height: "0.5px",
                backgroundColor: "#999",
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Outlet />
    </Grid>
  );
};

export default ExerciseDetail;
