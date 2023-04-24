import { DockviewApi } from "dockview";
import { v4 } from "uuid";

export const createDefaultLayout = (api: DockviewApi) => {
  api.addPanel({
    id: v4(),
    component: "default",
    title: "New editor",
    params: {
      title: "Panel 1",
    },
  });

  // panel.group.locked = true;
  // panel.group.header.hidden = true;
};
