import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

import Dashboard from "$src/containers/Dashboard";
import Demo from "$src/containers/Demo";
import ReduxDemo from "$src/containers/ReduxDemo";

const routes = [
  {
    path: "/",
    element: <Dashboard />,
    children: [
      { index: true, element: <Navigate to="demo" /> },
      {
        path: "demo",
        element: <Demo />,
      },
      { path: "redux-demo", element: <ReduxDemo /> },
    ],
  },
];

function Routes() {
  const element = useRoutes(routes);
  return element;
}

export default Routes;
