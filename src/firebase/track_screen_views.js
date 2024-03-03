import { logEvent } from "firebase/analytics";
import { analytics } from "./config";

const logScreenView = (screerName, screenClass) => {
  logEvent(analytics, "screen_view", {
    firebase_screen: screerName,
    firebase_screen_class: screenClass,
  });
};

const track_screen_views = (pathname) => {
  let screenClass = "GymKhana";
  switch (pathname) {
    case "/workouts":
      screenClass = "Workouts";
      break;
    case "/results":
      screenClass = "Results";
      break;
    case "/calendar":
      screenClass = "Calendar";
      break;
    case "/options":
      screenClass = "Options";
      break;
    default:
      break;
  }
  logScreenView(pathname, screenClass);
};

export default track_screen_views;
