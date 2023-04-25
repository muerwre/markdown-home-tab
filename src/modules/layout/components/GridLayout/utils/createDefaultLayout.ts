import { DockviewApi } from "dockview";
import { v4 } from "uuid";

export const createDefaultLayout = (api: DockviewApi) => {
  const panel = api.addPanel({
    id: v4(),
    component: "default",
    title: "",
    params: {
      title: "",
      locked: false,
    },
  });

  // panel.group.locked = true;
  panel.group.header.hidden = true;
};
