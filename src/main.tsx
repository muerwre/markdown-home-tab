import React from "react";
import ReactDOM from "react-dom/client";
import { Editor } from "~/pages/editor";

import "./styles/main.scss";
import { ThemeProvider } from "./modules/theme/containers/ThemeProvider";
import { SettingsProvider } from "./modules/settings/providers/SettingsProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SettingsProvider>
      <ThemeProvider>
        <Editor />
      </ThemeProvider>
    </SettingsProvider>
  </React.StrictMode>
);
