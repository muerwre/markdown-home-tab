import { Orientation, SerializedDockview } from "dockview";

export const emptyLayout: SerializedDockview = {
  panels: {},
  grid: {
    root: {
      type: "leaf",
      data: {
        views: [],
        id: "",
      },
    },
    height: 0,
    width: 0,
    orientation: Orientation.HORIZONTAL,
  },
};
