import * as React from "react";
import { createRoot } from "react-dom/client";
import { MainWebsite } from "./Components/MainWebsite";

const rootNode = document.getElementById("app");
createRoot(rootNode).render(<MainWebsite />);