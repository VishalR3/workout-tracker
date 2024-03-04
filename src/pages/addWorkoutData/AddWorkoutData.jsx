/* eslint-disable react/prop-types */
import { ArrowBackIos } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { db } from "../../db/db";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import moment from "moment";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../firebase/config";
import { GoBtn } from "../../components/exercises/exercise/ExerciseDescription";

const AppleInput = ({
  value,
  setValue,
  label,
  id,
  type,
  showBorder = false,
}) => {
  return (
    <Grid item>
      <Grid
        container
        sx={{
          borderBlock: showBorder ? "1px solid #ccc" : undefined,
          py: 0.75,
        }}
      >
        <Grid item>
          <Typography
            component={"label"}
            htmlFor={id}
            variant="subtitle1"
            color="#aaa"
            fontSize={"1rem"}
          >
            {label}
          </Typography>
        </Grid>
        <Grid item flexGrow={1} textAlign={"right"}>
          <Box
            component={"input"}
            id={id}
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            textAlign={"right"}
            sx={{
              border: "none",
              backgroundColor: "transparent",
              outline: "none",
              width: "100%",
              textAlign: "-webkit-right",
              fontFamily:
                "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
              fontWeight: "500",
              fontSize: "1rem",
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

const AddWorkoutData = () => {
  const { name } = useParams();
  const { exercise } = useLoaderData();
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const navigate = useNavigate();

  const goBack = () => {
    navigate("..");
  };

  const workoutRecords = useLiveQuery(async () => {
    const records = await db.workoutHistory
      .where("exercise_id")
      .equals(exercise.id)
      .toArray();
    const groupedRecords = {};
    records.forEach((record) => {
      let toString = "";
      if (record.reps) toString += record.reps + " Reps";
      if (record.reps && record.weight) toString += " x ";
      if (record.weight) toString += record.weight + " " + record.weight_unit;

      record.toString = toString;
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
        date: date,
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
        <Grid container>
          <Grid item>
            <Button startIcon={<ArrowBackIos />} onClick={goBack}>
              Description
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          direction={"column"}
          sx={(theme) => ({
            backgroundColor: theme.palette.style.neutral,
            borderRadius: "0.5rem",
            padding: "0.25rem 0.8rem",
            marginBlockEnd: "1rem",
          })}
        >
          <AppleInput
            value={date}
            setValue={setDate}
            label="Date"
            id="dateInput"
            type="date"
          />
          <AppleInput
            value={reps}
            setValue={setReps}
            label="Reps"
            id="repsInput"
            type="number"
            showBorder={true}
          />
          <AppleInput
            value={weight}
            setValue={setWeight}
            label="Weight (Kg)"
            id="weightInput"
            type="number"
          />
        </Grid>
        <GoBtn
          variant="contained"
          fullWidth
          size="large"
          disableElevation
          onClick={addData}
        >
          Add
        </GoBtn>
      </Grid>
      {workoutRecords &&
        Object.keys(workoutRecords)?.map((date, index) => (
          <Grid item xs={12} key={index}>
            <Typography variant="h3" textAlign={"center"}>
              {date}
            </Typography>
            <List disablePadding sx={{ listStyle: "decimal", pl: 3 }}>
              {workoutRecords[date]?.map((record, i) => (
                <ListItem key={i} sx={{ display: "list-item" }}>
                  <ListItemText primary={record.toString} />
                </ListItem>
              ))}
            </List>
          </Grid>
        ))}
    </>
  );
};

export default AddWorkoutData;
