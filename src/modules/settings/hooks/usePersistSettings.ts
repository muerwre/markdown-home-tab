import { useCallback, useState } from "react";
import { defaultSettings } from "../context/SettingsContext";
import {
  Theme,
  defaultDarkTheme,
  defaultLightTheme,
} from "~/modules/theme/constants/theme";
import { useDetectTheme } from "~/modules/theme/hooks/useDetectTheme";
import { SettingsValue } from "~/modules/settings/context/SettingsContext";

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
  const theme = useDetectTheme();
  const defaultColors =
    theme === Theme.Dark ? defaultDarkTheme : defaultLightTheme;

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
