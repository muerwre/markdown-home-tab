import { DockviewApi, DockviewReadyEvent } from "dockview";
import { useCallback, useEffect, useRef, useState } from "react";
import { useStorage } from "../../../../../modules/storage/StorageContext";
import { createDefaultLayout } from "../utils/createDefaultLayout";

export const useGridLayoutPersistance = () => {
  const api = useRef<DockviewApi>();
  const [hydrated, setHydrated] = useState(false);
  const { layout, setLayout } = useStorage();

  const onReady = (event: DockviewReadyEvent) => {
    if (hydrated) {
      return;
    }

    api.current = event.api;

    if (!layout) {
      createDefaultLayout(event.api);
      return;
    }

    event.api.fromJSON(layout);
    setHydrated(true);
  };

  const persistLayout = useCallback(() => {
    if (!api.current) {
      return;
    }

    setLayout(api.current.toJSON());
  }, [setLayout]);

  useEffect(() => {
    const onLayoutChange = api.current?.onDidLayoutChange(() => {
      if (!api.current || !hydrated) {
        return;
      }

      if (!api.current.groups.length) {
        createDefaultLayout(api.current);
      }

      persistLayout();
    });

    return onLayoutChange?.dispose;
  }, [persistLayout, hydrated]);

  return { api, onReady, persistLayout, hydrated };
};
