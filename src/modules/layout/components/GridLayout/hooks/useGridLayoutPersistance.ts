import { DockviewApi, DockviewReadyEvent } from "dockview";
import { useCallback, useEffect, useRef } from "react";
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

  const persistLayout = useCallback(() => {
    if (!api.current) {
      return;
    }

    const layout = api.current.toJSON();

    localStorage.setItem("dockview_persistance_layout", JSON.stringify(layout));
  }, []);

  useEffect(() => {
    if (!api.current) {
      return;
    }

    const onLayoutChange = api.current.onDidLayoutChange(() => {
      if (!api.current) {
        return;
      }

      if (!api.current.groups.length) {
        createDefaultLayout(api.current);
      }

      persistLayout();
    });

    const onPanelChange = api.current.onDidActivePanelChange((event) => {
      console.log(event);
    });

    return () => {
      onLayoutChange.dispose();
      onPanelChange.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persistLayout, api.current]);

  return { api, onReady, persistLayout };
};
