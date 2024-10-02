import { useCallback, useEffect, useState } from "react";
import { SettingsValue } from "~/modules/settings/context/SettingsContext";
import { useDefaultTheme } from "~/modules/theme/hooks/useDefaultTheme";
import { BrowserSyncStorage } from "~/utils";
import { defaultSettings } from "../context/SettingsContext";

const storage = new BrowserSyncStorage('settings');

export const usePersistSettings = () => {
  const [hydrated, setHydrated] = useState(false);

  const defaultColors = useDefaultTheme();

  const [settings, setSettings] = useState({
    ...defaultSettings, ...defaultColors
  });

  const update = useCallback((val: Partial<SettingsValue>) => {
    if (!hydrated) {
      return;
    }

    setSettings((v) => {
      const updatedValue = { ...v, ...val };
      storage.set("", updatedValue);
      return updatedValue;
    });
  }, [hydrated]);

  useEffect(() => {
    storage.get<SettingsValue>("").then(next => {
      setSettings(prev => ({ ...prev, ...next }));
    }).finally(() => setHydrated(true));
  }, [])

  return { settings, update, hydrated };
};
