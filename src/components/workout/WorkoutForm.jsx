import PropTypes from "prop-types";
import {
  Button,
  Chip,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const WorkoutForm = ({ workout = false, submitFunction }) => {
  const { register, setValue, handleSubmit } = useForm();
  const [noOfSections, setNoOfSections] = useState(0);
  const [isEditForm, setIsEditForm] = useState(false);

  useEffect(() => {
    if (workout) {
      setValue("name", workout.name);
      setValue("description", workout.description);
      setValue("sections", workout.sections);
      setNoOfSections(workout.sections.length - 1);
      setIsEditForm(true);
    }
  }, [workout]);

  return (
    <form onSubmit={handleSubmit(submitFunction)}>
      <Grid container flexDirection={"column"} spacing={2}>
        <Grid item>
          <TextField
            type="text"
            label="Workout Name"
            {...register("name")}
            fullWidth
            InputLabelProps={{
              shrink: isEditForm ? true : undefined,
            }}
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
            InputLabelProps={{
              shrink: isEditForm ? true : undefined,
            }}
          />
        </Grid>
        <Grid item>
          <Grid container justifyContent="space-between" alignItems={"center"}>
            <Typography sx={{ fontWeight: "bold" }}>Sections</Typography>
            <Chip
              size="small"
              label="Add Section"
              sx={{ px: 1 }}
              onClick={() => setNoOfSections(noOfSections + 1)}
            />
          </Grid>
          {Array(noOfSections + 1)
            .fill(1)
            .map((_, index) => (
              <Grid
                container
                key={index}
                spacing={1}
                mt={1}
                flexDirection={"column"}
              >
                <Grid item>
                  <TextField
                    type="text"
                    label="Section Name"
                    {...register(`sections.${index}.name`)}
                    fullWidth
                    InputLabelProps={{
                      shrink: isEditForm ? true : undefined,
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type="text"
                    multiline
                    label="Section Description"
                    {...register(`sections.${index}.description`)}
                    fullWidth
                    InputLabelProps={{
                      shrink: isEditForm ? true : undefined,
                    }}
                  />
                </Grid>
                <Grid item>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems={"center"}
                  >
                    <Typography>Preferred Day</Typography>
                    <Select
                      defaultValue={"monday"}
                      {...register(`sections.${index}.preferred_day`)}
                    >
                      <MenuItem value="monday">Monday</MenuItem>
                      <MenuItem value="tuesday">Tuesday</MenuItem>
                      <MenuItem value="wednesday">Wednesday</MenuItem>
                      <MenuItem value="thursday">Thursday</MenuItem>
                      <MenuItem value="friday">Friday</MenuItem>
                      <MenuItem value="saturday">Saturday</MenuItem>
                      <MenuItem value="sunday">Sunday</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
            ))}
        </Grid>
        <Grid item>
          <Button type="submit" variant={"contained"} fullWidth>
            {isEditForm ? "Edit" : "Add"} Workout
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

WorkoutForm.propTypes = {
  workout: PropTypes.object,
  submitFunction: PropTypes.func.isRequired,
};

export default WorkoutForm;
