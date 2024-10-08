import { useMemo } from "react";
import { useStorage } from "~/modules/storage/StorageContext";
import { useDefaultTheme } from "~/modules/theme/hooks/useDefaultTheme";
import { defaultSettings } from "../context/SettingsContext";

export const useSettings = () => {
  const defaultColors = useDefaultTheme();

  const { settings: storedSettings, setSettings } = useStorage();

  const settings = useMemo(
    () => ({ ...defaultSettings, ...defaultColors, ...storedSettings }),
    [defaultColors, storedSettings]
  );

  return { settings, update: setSettings };
};
