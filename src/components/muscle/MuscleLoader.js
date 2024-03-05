import { collection, getDocs, query, where } from "firebase/firestore";
import { fireDB } from "../../firebase/config";
import { defer } from "react-router-dom";

export const muscleLoader = async ({ params }) => {
  const q = query(
    collection(fireDB, "Exercises"),
    where("main_muscle", "==", params.name)
  );
  const querySnapshot = getDocs(q);
  return defer({ exercises: querySnapshot });
};
