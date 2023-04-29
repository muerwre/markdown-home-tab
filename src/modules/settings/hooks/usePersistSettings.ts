import { useCallback, useState } from "react";
import { SettingsValue } from "~/modules/settings/context/SettingsContext";
import { useDefaultTheme } from "~/modules/theme/hooks/useDefaultTheme";
import { defaultSettings } from "../context/SettingsContext";

const getLocalStorageSettings = (defaultValue: SettingsValue) => {
  try {
    const raw = localStorage.getItem("settings");
    const parsed = JSON.parse(raw ?? "");

    return parsed ? { ...defaultValue, ...parsed } : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

export const usePersistSettings = () => {
  const defaultColors = useDefaultTheme();

  const [settings, setSettings] = useState<SettingsValue>(
    getLocalStorageSettings({ ...defaultSettings, ...defaultColors })
  );

  const update = useCallback((val: Partial<SettingsValue>) => {
    setSettings((v) => {
      const updatedValue = { ...v, ...val };
      localStorage.setItem("settings", JSON.stringify(updatedValue));
      return updatedValue;
    });
  }, []);

  return { settings, update };
};
