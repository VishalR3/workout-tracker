import { useLoaderData, useParams } from "react-router-dom";
import { Box, Chip, Grid, Typography, styled } from "@mui/material";
import { titleCase } from "../../../utils";

const MuscleChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "type",
})(({ type }) => ({
  borderRadius: "4px",
  fontWeight: "500",
  backgroundColor: type == "main" ? "#ffb68461" : undefined,
  color: type == "main" ? "#f4711a" : undefined,
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
                label={titleCase(exercise?.main_muscle)}
                size="small"
                type="main"
              />
              {exercise?.supp_muscles_targeted
                .split(",")
                .map((muscle, index) => (
                  <MuscleChip
                    key={index}
                    label={titleCase(muscle)}
                    size="small"
                  />
                ))}
            </Grid>
            <Box
              sx={(theme) => ({
                my: 2,
                width: "100%",
                height: "0.5px",
                backgroundColor: theme.palette.primary.main,
              })}
            />
          </Grid>
          <Grid item>
            <Grid container justifyContent={"space-between"}>
              <Grid item>
                <Grid
                  container
                  direction="column"
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Typography variant="h4">LEVEL</Typography>
                  <Typography variant="h3" color={"primary.contrastText"}>
                    {String(exercise?.difficulty).toUpperCase()}
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
                  <Typography variant="h3" color={"primary.contrastText"}>
                    {String(exercise?.equipment).toUpperCase()}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">{exercise?.description} </Typography>
      </Grid>
    </Grid>
  );
};

export default ExerciseDetail;
