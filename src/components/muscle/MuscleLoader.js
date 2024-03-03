import { collection, getDocs, query, where } from "firebase/firestore";
import { fireDB } from "../../firebase/config";

export const muscleLoader = async ({ params }) => {
  const exercises = [];
  const q = query(
    collection(fireDB, "Exercises"),
    where("main_muscle", "==", params.name)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    exercises.push({ id: doc.id, ...doc.data() });
  });
  return { exercises };
};
