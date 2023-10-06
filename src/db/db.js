import Dexie from "dexie";

export const db = new Dexie("gkDatabase");

db.version(1).stores({
  workouts:"++id, name, description, sections, is_favorite, is_current",
})