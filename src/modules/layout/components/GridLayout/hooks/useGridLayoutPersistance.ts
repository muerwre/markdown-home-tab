import { DockviewApi, DockviewReadyEvent } from "dockview";
import { useEffect, useRef } from "react";
import { createDefaultLayout } from "../utils/createDefaultLayout";

export const useGridLayoutPersistance = () => {
  const api = useRef<DockviewApi>();

  const onReady = (event: DockviewReadyEvent) => {
    api.current = event.api;

    const layoutString = localStorage.getItem("dockview_persistance_layout");

    if (!layoutString) {
      createDefaultLayout(event.api);
      return;
    }

    try {
      const layout = JSON.parse(layoutString);
      event.api.fromJSON(layout);
    } catch (err) {
      console.log(err);
      createDefaultLayout(event.api);
    }
  };

  useEffect(() => {
    if (!api.current) {
      return;
    }

    const disposable = api.current.onDidLayoutChange(() => {
      if (!api.current) {
        return;
      }

      if (!api.current.groups.length) {
        createDefaultLayout(api.current);
      }

      const layout = api.current.toJSON();

      localStorage.setItem(
        "dockview_persistance_layout",
        JSON.stringify(layout)
      );
    });

    return () => {
      disposable.dispose();
    };
  }, []);

  return { api, onReady };
};
