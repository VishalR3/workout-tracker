import {
  CalendarMonth,
  FitnessCenter,
  Menu,
  SportsGymnastics,
  Timeline,
} from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import track_screen_views from "../firebase/track_screen_views";

const Layout = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();

  useLayoutEffect(() => {
    track_screen_views(location.pathname);
    switch (location.pathname) {
      case "/workouts":
        setValue(1);
        break;
      case "/results":
        setValue(2);
        break;
      case "/calendar":
        setValue(3);
        break;
      case "/options":
        setValue(4);
        break;
      default:
        setValue(0);
        break;
    }
  }, [location]);

  return (
    <div>
      <main>
        <Outlet />
      </main>
      <section className="navigation-bar">
        <BottomNavigation
          // showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            to="/"
            // label="Exercises"
            icon={<SportsGymnastics />}
            LinkComponent={Link}
          />
          <BottomNavigationAction
            to="/workouts"
            // label="Workouts"
            icon={<FitnessCenter />}
            LinkComponent={Link}
          />
          <BottomNavigationAction
            to="/results"
            // label="Results"
            icon={<Timeline />}
            LinkComponent={Link}
          />
          <BottomNavigationAction
            to="/calendar"
            // label="Calendar"
            icon={<CalendarMonth />}
            LinkComponent={Link}
          />
          <BottomNavigationAction
            to="/options"
            // label="Options"
            icon={<Menu />}
            LinkComponent={Link}
          />
        </BottomNavigation>
      </section>
    </div>
  );
};

export default Layout;
