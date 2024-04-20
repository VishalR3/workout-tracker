import Dexie from "dexie";

export const db = new Dexie("gkDatabase");

db.version(7).stores({
  workouts: "++id, name, description, sections, isFavorite",
  weight: "++id, value, timestamp",
  workoutHistory:
    "++id,exercise_id,exercise_name,reps,weight,weight_unit,comment,timestamp,date",
  exercises:
    "++id,exercise_id ,name, description, video, main_muscle, supp_muscles_targeted, difficulty, bgColor, equipment, is_time_dependent",
});
