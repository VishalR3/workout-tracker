import {
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Box, Button, Chip, Grid, Typography, styled } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";

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
  const navigate = useNavigate();

  return (
    <Grid container spacing={3} p={2}>
      {/* A Back Button That Can take users to the previous page */}
      <Grid item xs={12}>
        <Button startIcon={<ArrowBackIos />} onClick={() => navigate(-1)}>
          {exercise?.main_muscle}
        </Button>
      </Grid>
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
                ?.map(
                  (muscle, index) =>
                    muscle !== "" && (
                      <MuscleChip key={index} label={muscle} size="small" />
                    )
                )}
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
