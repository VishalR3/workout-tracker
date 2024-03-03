import { collection, getDocs, query, where } from "firebase/firestore";
import { fireDB } from "../../../firebase/config";

export const exerciseLoader = async ({ params }) => {
  let exercise = false;
  const q = query(
    collection(fireDB, "Exercises"),
    where("name", "==", params.name)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    if (!exercise) exercise = { id: doc.id, ...doc.data() };
  });
  return { exercise };
};
