import * as React from "react";
import * as ReactDOM from "react-dom";
import { MainWebsite } from "./Components/MainWebsite";
import { PrivacyPolicyPage } from "./Components/PrivacyPolicyPage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainWebsite />,
  },
  {
    path: "privacy-policy",
    element: <PrivacyPolicyPage />,
  },
]);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById("app")
);
