import { SerializedDockview } from "dockview";
import { ReactNode, useCallback, useEffect, useState } from "react";
import {
  hydrateLayout,
  storeLayoutLocally,
  storePanelLocally,
} from "~/utils/hydrate";
import { useDelayedSync } from "./hooks/useDelayedSync";
import { StorageContext } from "./StorageContext";

const debounceDelay = 500;

export const StorageProvider = ({ children }: { children: ReactNode }) => {
  const [hydrated, setHydrated] = useState(false);
  const [layout, setLayoutValue] = useState<SerializedDockview | null>(null);
  const [panels, setPanelsValue] = useState<Record<string, string>>({});

  const { storeLayout, storePanel } = useDelayedSync(debounceDelay);

  const setPanel = useCallback(
    (uuid: string, value: string) => {
      setPanelsValue((prev) => ({ ...prev, [uuid]: value }));
      storePanelLocally(uuid, value);
      storePanel(uuid, value);
    },
    [storePanel]
  );

  const setLayout = useCallback(
    (value: SerializedDockview) => {
      setLayoutValue(value);
      storeLayoutLocally(value);
      storeLayout(value);
    },
    [storeLayout]
  );

  useEffect(() => {
    if (hydrated) {
      return;
    }

    hydrateLayout()
      .then((result) => {
        if (!result) {
          return;
        }

        setLayout(result.layout);

        Object.entries(result.panels).forEach(([uuid, value]) => {
          setPanel(uuid, value);
        });
      })
      .finally(() => {
        setHydrated(true);
      });
  }, [hydrated, setLayout, setPanel]);

  return (
    <StorageContext.Provider
      value={{ hydrated, layout, panels, setLayout, setPanel }}
    >
      {hydrated ? children : null}
    </StorageContext.Provider>
  );
};
