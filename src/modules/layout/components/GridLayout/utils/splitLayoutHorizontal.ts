import { DockviewApi } from "dockview";
import { v4 } from "uuid";

export const splitLayoutHorizontal = (
  referencePanel: string,
  api: DockviewApi
) => {
  const panel = api.addPanel({
    id: v4(),
    component: "default",
    title: "",
    params: {
      title: "",
      locked: false,
    },
    position: {
      referencePanel,
      direction: "below",
    },
  });

  // panel.group.locked = true;
  panel.group.header.hidden = true;
};
