import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Trips from "../pages/Trips";
import SeatSelection from "../pages/SeatSelection";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/trips", element: <Trips /> },
    { path: "/seat-selection", element: <SeatSelection /> },
    { path: "/*", element: <NotFound /> },
  ]);
};

export default AppRoutes;