import PropTypes from "prop-types";
import {
  Button,
  Chip,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";

const WorkoutForm = ({ workout = false, submitFunction }) => {
  const { register, setValue, control, handleSubmit } = useForm();
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
                spacing={3}
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
                  <Grid container flexDirection={"column"} spacing={2}>
                    <Grid item>
                      <Typography>Preferred Day</Typography>
                    </Grid>
                    <Grid item>
                      {/* Radio Buttons for each day of the week, so that only one day can be selected. All Day Present in a single row */}
                      <Controller
                        name={`sections.${index}.preferred_day`}
                        control={control}
                        render={({ field }) => (
                          <ToggleButtonGroup
                            color="primary"
                            {...field}
                            onChange={(e, val) => {
                              e.target.value = val;
                              field.onChange(e);
                            }}
                            exclusive
                            aria-label="preffered-day"
                            sx={{
                              width: "100%",
                              justifyContent: "space-between",
                              "& .MuiButtonBase-root": {
                                border: "1px solid rgba(0, 0, 0, 0.12)",
                                borderRadius: "12px",
                              },
                              "& .Mui-selected": {
                                color: "#ffffff !important",
                                backgroundColor: "#F9B485 !important",
                              },
                            }}
                          >
                            <ToggleButton value="monday">M</ToggleButton>
                            <ToggleButton value="tuesday">T</ToggleButton>
                            <ToggleButton value="wednesday">W</ToggleButton>
                            <ToggleButton value="thursday">T</ToggleButton>
                            <ToggleButton value="friday">F</ToggleButton>
                            <ToggleButton value="saturday">S</ToggleButton>
                            <ToggleButton value="sunday">S</ToggleButton>
                          </ToggleButtonGroup>
                        )}
                      />
                    </Grid>
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
