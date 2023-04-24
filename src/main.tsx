import React from "react";
import ReactDOM from "react-dom/client";
import { Editor } from "~/pages/editor";

import "./styles/main.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Editor />
  </React.StrictMode>
);
