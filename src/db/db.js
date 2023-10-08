import Dexie from "dexie";

export const db = new Dexie("gkDatabase");

db.version(3).stores({
  workouts: "++id, name, description, sections, isFavorite",
});
