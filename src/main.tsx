import React from "react";
import ReactDOM from "react-dom/client";
import { Editor } from "~/pages/editor";

import "./styles/main.scss";
import { ThemeProvider } from "./modules/theme/containers/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <Editor />
    </ThemeProvider>
  </React.StrictMode>
);
