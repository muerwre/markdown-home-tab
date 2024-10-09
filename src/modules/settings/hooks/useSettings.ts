import { useCallback, useMemo } from "react";
import { useStorage } from "~/modules/storage/StorageContext";
import { useDefaultTheme } from "~/modules/theme/hooks/useDefaultTheme";
import { defaultSettings, SettingsValue } from "../context/SettingsContext";

export const useSettings = () => {
  const defaultColors = useDefaultTheme();

  const { settings: storedSettings, setSettings } = useStorage();

  const settings = useMemo(
    () => ({ ...defaultSettings, ...defaultColors, ...storedSettings }),
    [defaultColors, storedSettings]
  );

  const update = useCallback(
    (value: Partial<SettingsValue>) => {
      setSettings({ ...settings, ...value });
    },
    [setSettings, settings]
  );

  return { settings, update };
};
