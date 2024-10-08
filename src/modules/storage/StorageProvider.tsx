import { SerializedDockview } from "dockview";
import { ReactNode, useCallback, useEffect, useState } from "react";
import {
  hydrateLayout,
  storeLayoutLocally,
  storePanelLocally,
  storeSettingsLocally,
} from "~/utils/hydrate";
import { useDelayedSync } from "./hooks/useDelayedSync";
import { StorageContext } from "./StorageContext";
import { SettingsValue } from "~/modules/settings/context/SettingsContext";

const debounceDelay = 500;

export const StorageProvider = ({ children }: { children: ReactNode }) => {
  const [hydrated, setHydrated] = useState(false);
  const [layout, setLayoutValue] = useState<SerializedDockview | null>(null);
  const [panels, setPanelsValue] = useState<Record<string, string>>({});
  const [settings, setSettingsValue] = useState<Partial<SettingsValue>>({});

  const { storeLayout, storePanel, storeSettings } =
    useDelayedSync(debounceDelay);

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

  const setSettings = useCallback((value: Partial<SettingsValue>) => {
    setSettingsValue(value);
    storeSettingsLocally(value);
    storeSettings(value);
  }, []);

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
        setSettings(result.settings);

        Object.entries(result.panels).forEach(([uuid, value]) => {
          setPanel(uuid, value);
        });
      })
      .finally(() => {
        setHydrated(true);
      });
  }, [hydrated, setLayout, setPanel, setSettings]);

  return (
    <StorageContext.Provider
      value={{
        hydrated,
        layout,
        panels,
        settings,
        setLayout,
        setPanel,
        setSettings,
      }}
    >
      {hydrated ? children : null}
    </StorageContext.Provider>
  );
};
