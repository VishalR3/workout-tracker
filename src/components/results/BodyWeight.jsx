import { Add, Close } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import CurveGraph from "./CurveGraph";
import { useState } from "react";
import { db } from "../../db/db";
import { useLiveQuery } from "dexie-react-hooks";

const BodyWeight = () => {
  const [addingMetric, setAddingMetric] = useState(false);
  const [metric, setMetric] = useState("");
  const weightData = useLiveQuery(async () => {
    const weight = await db.weight.toArray();
    // if multiple weights have the same date, only the latest one will be returned
    const trimmedWeights = {};
    weight.forEach((w) => {
      const date = new Date(w.timestamp).toLocaleDateString();
      trimmedWeights[date] = {
        ...w,
        date: date,
      };
    });
    return trimmedWeights;
  });

  const addMetric = async () => {
    try {
      const id = await db.weight.add({
        value: metric,
        timestamp: new Date(),
      });
      console.log(`Weight with Id: ${id} is added`);
    } catch (e) {
      console.log("Error:", e);
    }
    setAddingMetric(false);
  };

  return (
    <Grid item xs={12}>
      <Grid container justifyContent="space-between" alignItems={"center"}>
        <Typography variant="h3">Body Weight</Typography>
        <Button
          variant="outlined"
          size="small"
          sx={{ minWidth: "unset", padding: "unset" }}
          onClick={() => setAddingMetric(!addingMetric)}
        >
          {addingMetric ? <Close /> : <Add />}
        </Button>
      </Grid>
      <Grid container mt={2}>
        {weightData && <CurveGraph data={Object.values(weightData)} />}
      </Grid>
      {addingMetric && (
        <Grid container mt={1} spacing={1}>
          <Grid item flexGrow={1}>
            <TextField
              size="small"
              fullWidth
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={addMetric}>
              <Add />
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default BodyWeight;
