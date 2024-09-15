import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "components/Loadable";
import { RouteObject } from "react-router";

// pages
import Logout from "views/logout";
import GeneralRoutes from "./GeneralRoutes";

// Main
import MainPage from "views/main";

const SamplePage = Loadable(lazy(() => import("views/sample-page")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes: RouteObject = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "sample-page",
      element: <SamplePage />,
    },
    ...GeneralRoutes,
    {
      path: "logout",
      element: <Logout />,
    },
  ],
};

export default MainRoutes;
