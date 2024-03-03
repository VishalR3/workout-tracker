import Dexie from "dexie";

export const db = new Dexie("gkDatabase");

db.version(6).stores({
  workouts: "++id, name, description, sections, isFavorite",
  weight: "++id, value, timestamp",
  workoutHistory:
    "++id,exercise_id,exercise_name,reps,weight,weight_unit,comment,timestamp,date",
});
