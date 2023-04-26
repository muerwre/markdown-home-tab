import React from "react";
import ReactDOM from "react-dom/client";
import { Editor } from "~/pages/editor";

import { ThemeProvider } from "./modules/theme/containers/ThemeProvider";
import { SettingsProvider } from "./modules/settings/providers/SettingsProvider";

import "./i18n";
import "./styles/main.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SettingsProvider>
      <ThemeProvider>
        <Editor />
      </ThemeProvider>
    </SettingsProvider>
  </React.StrictMode>
);
