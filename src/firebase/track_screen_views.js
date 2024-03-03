import { logEvent } from "firebase/analytics";
import { analytics } from "./config";
import { titleCase } from "../utils";

const logScreenView = (screerName, screenClass) => {
  logEvent(analytics, "screen_view", {
    firebase_screen: screerName,
    firebase_screen_class: screenClass,
  });
};

const track_screen_views = (pathname) => {
  const breadcrumbs = pathname.split("/");
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
      if (breadcrumbs.length > 1)
        screenClass = titleCase(breadcrumbs[breadcrumbs.length - 1]);
      break;
  }
  logScreenView(pathname, screenClass);
};

export default track_screen_views;
