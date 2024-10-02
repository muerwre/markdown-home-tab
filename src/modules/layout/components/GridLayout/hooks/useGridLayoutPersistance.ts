import { DockviewApi, DockviewReadyEvent, SerializedDockview } from "dockview";
import { useCallback, useEffect, useRef, useState } from "react";
import { createDefaultLayout } from "../utils/createDefaultLayout";
import { BrowserSyncStorage } from "~/utils";

const storage = new BrowserSyncStorage();
const key = 'dockview_persistance_layout';

export const useGridLayoutPersistance = () => {
  const api = useRef<DockviewApi>();
  const [hydrated, setHydrated] = useState(false);

  const onReady = (event: DockviewReadyEvent) => {
    api.current = event.api;

    storage.get<SerializedDockview>(key).then(layout => {
      if (!layout) {
        throw new Error("No layout saved, its okay");
      }

      event.api.fromJSON(layout);
    }).catch(() => {
      createDefaultLayout(event.api);
      
    }).finally(() => {
      setHydrated(true);
    });
  };

  const persistLayout = useCallback(() => {
    if (!api.current) {
      return;
    }

    storage.set(key, api.current.toJSON());
  }, []);

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
