import { Add } from "@mui/icons-material";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { db } from "../../db/db";
import { useLoaderData, useParams } from "react-router-dom";
import { number } from "prop-types";
import { useLiveQuery } from "dexie-react-hooks";
import moment from "moment";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../firebase/config";

const AddWorkoutData = () => {
  const { name } = useParams();
  const { exercise } = useLoaderData();
  const [reps, setReps] = useState();
  const [weight, setWeight] = useState();

  const workoutRecords = useLiveQuery(async () => {
    const records = await db.workoutHistory
      .where("exercise_id")
      .equals(exercise.id)
      .toArray();
    const groupedRecords = {};
    records.forEach((record) => {
      // eslint-disable-next-line no-prototype-builtins
      if (!groupedRecords.hasOwnProperty(record.date))
        groupedRecords[record.date] = [record];
      else groupedRecords[record.date].push(record);
    });

    return groupedRecords;
  });

  const addData = async () => {
    try {
      const timestamp = new Date();
      const id = await db.workoutHistory.add({
        exercise_id: exercise.id,
        exercise_name: name,
        reps: reps,
        weight: weight,
        weight_unit: "kg",
        comment: "",
        timestamp: timestamp,
        date: moment().format("DD-MM-YYYY"),
      });
      console.log(`Weight with Id: ${id} is added`);
      setReps("");
      setWeight("");
      logEvent(analytics, "add_workout_record", {
        exercise_name: exercise?.name,
      });
    } catch (e) {
      console.log("Error:", e);
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Grid container flexWrap={"nowrap"} spacing={1} alignItems={"center"}>
          <Grid item>
            <TextField
              placeholder="Reps"
              size="small"
              value={reps}
              type={number}
              onChange={(e) => setReps(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Typography variant="h2" component={"div"}>
              x
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              placeholder="kg"
              size="small"
              value={weight}
              type={number}
              onChange={(e) => setWeight(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={addData}>
              <Add />
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {workoutRecords &&
        Object.keys(workoutRecords)?.map((date, index) => (
          <Grid item xs={12} key={index}>
            <Typography variant="h3" textAlign={"center"}>
              {date}
            </Typography>
            <List disablePadding sx={{ listStyle: "decimal", pl: 4 }}>
              {workoutRecords[date]?.map((record, i) => (
                <ListItem key={i} sx={{ display: "list-item" }}>
                  <ListItemText
                    primary={`${record.reps} Reps x ${record.weight} ${record.weight_unit}`}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        ))}
    </>
  );
};

export default AddWorkoutData;
