import {
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  FormControl,
  InputLabel,
  Snackbar,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { MUSCLES } from "../../../assets/content/muscles";
import EQUIPMENTS from "../../../assets/content/equipments";
import { useParams } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../../firebase/config";
import { useState } from "react";

const ExerciseForm = () => {
  const { muscleName } = useParams();
  const { register, handleSubmit } = useForm();
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const submitFunction = async (data) => {
    try {
      const docRef = await addDoc(collection(fireDB, "Exercises"), data);
      console.log("Document written with ID: ", docRef.id);
      setSnackBarOpen(true);
      setSnackBarMessage("Exercise Added");
    } catch (e) {
      console.error("Error adding document: ", e);
      setSnackBarOpen(true);
      setSnackBarMessage("Error Adding Exercise");
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarOpen(false);
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitFunction)}>
        <Grid container flexDirection={"column"} spacing={2}>
          <Grid item>
            <TextField
              type="text"
              label="Exercise Name"
              {...register("name")}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              type="text"
              multiline
              rows={4}
              label="Description"
              {...register("description")}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              type="text"
              label="Video"
              {...register("video")}
              fullWidth
            />
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <InputLabel id="main-muscle-targeted">
                Main Muscle Targeted
              </InputLabel>
              <Select
                labelId="main-muscle-targeted"
                label="Main Muscle Targeted"
                {...register("main_muscle")}
                defaultValue={muscleName}
              >
                {MUSCLES.map((muscle, index) => (
                  <MenuItem key={index} value={muscle.name}>
                    {muscle.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <InputLabel id="supplemental-muscle">
                Supplemental Muscle
              </InputLabel>
              <Select
                labelId="supplemental-muscle"
                label="Supplemental Muscle"
                {...register("supp_muscles_targeted")}
              >
                {MUSCLES.map((muscle, index) => (
                  <MenuItem key={index} value={muscle.name}>
                    {muscle.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <InputLabel id="difficulty">Difficulty</InputLabel>
              <Select
                labelId="difficulty"
                label="Difficulty"
                {...register("difficulty")}
              >
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <InputLabel id="equipment">Equipment</InputLabel>
              <Select
                labelId="equipment"
                label="Equipment"
                {...register("equipment")}
              >
                {EQUIPMENTS.map((equipment, index) => (
                  <MenuItem key={index} value={equipment}>
                    {equipment}
                  </MenuItem>
                ))}
                <MenuItem value="Not Required">Not Required</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <InputLabel id="is-time-dependent">Is Time Dependent</InputLabel>
              <Select
                labelId="is-time-dependent"
                label="Is Time Dependent"
                {...register("is_time_dependent")}
              >
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button type="submit" variant={"contained"} fullWidth>
              Add Exercise
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={snackBarOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackBarMessage}
      />
    </>
  );
};

export default ExerciseForm;
