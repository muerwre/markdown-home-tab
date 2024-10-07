import React from "react";
import ReactDOM from "react-dom/client";
import { Editor } from "~/pages/editor";

import { ThemeProvider } from "./modules/theme/containers/ThemeProvider";
import { SettingsProvider } from "./modules/settings/providers/SettingsProvider";
import { StorageProvider } from "~/modules/storage/StorageProvider";

import "./i18n";
import "./styles/main.scss";
import "./utils/seed";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StorageProvider>
      <SettingsProvider>
        <ThemeProvider>
          <Editor />
        </ThemeProvider>
      </SettingsProvider>
    </StorageProvider>
  </React.StrictMode>
);
