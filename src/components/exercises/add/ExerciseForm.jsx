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
import CustomSelect from "../../common/CustomSelect";

const ExerciseForm = () => {
  const { muscleName } = useParams();
  const { register, control, handleSubmit } = useForm();
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const submitFunction = async (data) => {
    const exercise = {
      ...data,
      main_muscle: data.main_muscle ? data.main_muscle.value : muscleName,
      supp_muscles_targeted: data.supp_muscles_targeted.reduce(
        (acc, muscle, index) => {
          if (index) acc += ", ";
          acc += muscle.value;
          return acc;
        },
        ""
      ),
    };
    try {
      const docRef = await addDoc(collection(fireDB, "Exercises"), exercise);
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
            <CustomSelect
              options={MUSCLES.map((muscle) => ({
                value: muscle.name,
                label: muscle.name,
              }))}
              defaultValue={{
                value: muscleName,
                label: muscleName,
              }}
              name="main_muscle"
              control={control}
            />
          </Grid>
          <Grid item>
            <CustomSelect
              options={MUSCLES.map((muscle) => ({
                value: muscle.name,
                label: muscle.name,
              }))}
              name="supp_muscles_targeted"
              control={control}
              isMulti
            />
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
