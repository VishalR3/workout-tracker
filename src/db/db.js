import Dexie from "dexie";

export const db = new Dexie("gkDatabase");

db.version(4).stores({
  workouts: "++id, name, description, sections, isFavorite",
  weight: "++id, value, timestamp",
});
