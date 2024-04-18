import { Chip, Grid, Typography, styled, IconButton } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { Suspense, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ExerciseListDetail from "../../components/muscle/ExerciseListDetail";
import RowSkeleton from "./RowSkeleton";
import EQUIPMENTS from "../../assets/content/equipments";
import { Add } from "@mui/icons-material";

const EquipmentChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "selected",
})(({ theme, selected }) => ({
  fontSize: "0.875rem",
  fontWeight: "bold",
  color: selected ? theme.palette.primary.contrastText : undefined,
  backgroundColor: selected ? "#ffb68461" : undefined,
  transition: "all 200ms ease-in-out",
}));

/**
 * Renders the Muscle component, displaying exercises for a specific muscle group.
 *
 * @return {JSX.Element} The rendered Muscle component
 */
const Muscle = () => {
  const { name } = useParams();
  const exercises = useSelector((state) => state.exercises.muscles[name]);
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const navigate = useNavigate();

  const filteredExercises = useMemo(() => {
    if (!selectedEquipment) return exercises;
    return exercises?.filter(
      (exercise) =>
        exercise?.equipment?.toLowerCase() === selectedEquipment?.toLowerCase()
    );
  }, [selectedEquipment]);

  return (
    <Grid container spacing={3} p={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" alignContent={"center"}>
          <Grid item>
            <Typography variant="h1">{name}</Typography>
          </Grid>
          <Grid item>
            <IconButton
              color="primary"
              sx={{ height: "28px" }}
              onClick={() => navigate(`/add/exercise/${name}`)}
            >
              <Add />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container flexWrap={"nowrap"} spacing={1}>
          {EQUIPMENTS.map((equipment, index) => (
            <Grid
              item
              key={index}
              onClick={() => {
                if (selectedEquipment == equipment) setSelectedEquipment("");
                else setSelectedEquipment(equipment);
              }}
            >
              <EquipmentChip
                label={equipment}
                selected={selectedEquipment === equipment}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container flexDirection={"column"} spacing={2}>
          <Suspense fallback={<RowSkeleton />}>
            {filteredExercises?.map((exercise, index) => (
              <ExerciseListDetail exercise={exercise} key={index} />
            ))}
          </Suspense>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Muscle;
