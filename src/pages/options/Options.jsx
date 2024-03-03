import { Grid, Typography } from "@mui/material";
import Section from "../../components/options/Section";
// import { EXERCISES } from "../../assets/content/exercises";
// import { addDoc, collection } from "firebase/firestore";
// import { fireDB } from "../../firebase/config";

const Options = () => {
  // const handleClick = () => {
  //   EXERCISES.map(async (exercise) => {
  //     try {
  //       const docRef = await addDoc(collection(fireDB, "Exercises"), exercise);
  //       console.log("Document written with ID: ", docRef.id);
  //     } catch (e) {
  //       console.error("Error adding document: ", e);
  //     }
  //   });
  // };
  return (
    <Grid container spacing={3} p={2}>
      <Grid item xs={12}>
        <Typography variant="h1">Options</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3">Your Settings</Typography>
        <Grid container mt={2}>
          <Section />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3">App Settings</Typography>
        <Grid container mt={2}>
          {/* <Button variant="contained" onClick={handleClick}>
            Add Exercise
          </Button> */}
        </Grid>
        <Grid container mt={2}>
          <Section height="300px" />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h3">Legal</Typography>
        <Grid container my={2}>
          <Section height="80px" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Options;
