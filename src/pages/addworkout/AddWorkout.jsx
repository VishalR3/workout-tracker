import { Button, Chip, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { db } from "../../db/db";

const AddWorkout = () => {
  const { register, handleSubmit } = useForm();
  const [noOfSections, setNoOfSections] = useState(0);
  const navigate = useNavigate();

  const addWorkoutButton = async (data) => {
    try {
      const id = await db.workouts.add({
        ...data
      })
      console.log(`Workout with Id: ${id} is added`);
    } catch (e) {
      console.log("Error:", e);
    }
    navigate("/workouts");
  }
  return (
    <Grid container spacing={3} p={2}>
      <Grid item xs={12}>
        <Typography variant="h1">Add Workout</Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(addWorkoutButton)}>
          <Grid container flexDirection={'column'} spacing={2}>
            <Grid item>
              <TextField type="text" label="Workout Name" {...register("name")} fullWidth />
            </Grid>
            <Grid item>
              <TextField type="text" multiline rows={4} label="Description" {...register("description")} fullWidth />
            </Grid>
            <Grid item>
              <Grid container justifyContent="space-between" alignItems={"center"}>
                <Typography sx={{ fontWeight: "bold" }}>Sections</Typography>
                <Chip size="small" label="Add Section" sx={{ px: 1 }} onClick={() => setNoOfSections(noOfSections + 1)} />
              </Grid>
              {Array(noOfSections + 1).fill(1).map((_, index) => (
                <Grid container key={index} spacing={1} mt={1} flexDirection={'column'}>
                  <Grid item>
                    <TextField type="text" label="Section Name" {...register(`sections.${index}.name`)} fullWidth />
                  </Grid>
                  <Grid item>
                    <TextField type="text" multiline label="Section Description" {...register(`sections.${index}.description`)} fullWidth />
                  </Grid>
                  <Grid item>
                    <Grid container justifyContent="space-between" alignItems={"center"}>
                      <Typography>Preferred Day</Typography>
                      <Select defaultValue={"monday"} {...register(`sections.${index}.preferred_day`)}>
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
              <Button type="submit" variant={"contained"} fullWidth>Add Workout</Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default AddWorkout;